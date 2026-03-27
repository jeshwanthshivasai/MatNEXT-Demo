import React from 'react';
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, OffthreadVideo, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { RecordingBlip } from '../../components/overhaul/RecordingBlip';
import { HighlightRing } from '../../components/overhaul/HighlightRing';

interface Keyframe {
    frame: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface RingSettings {
    startFrame: number;
    endFrame: number;
    keyframes: Keyframe[];
}

// --- MANUAL CONTROL KNOBS ---
// 17:10 = 520f. Sequence starts at 480f. Relative start = 40.
// 18:10 = 550f. Relative end = 70.
// Doubled relative timings
const RING_1_SETTINGS: RingSettings = {
    startFrame: 96,
    endFrame: 170,
    keyframes: [
        { frame: 96, x: 730, y: 860, width: 330, height: 70 },
        { frame: 170, x: 730, y: 860, width: 330, height: 70 },
    ]
};

const RING_2_SETTINGS: RingSettings = {
    startFrame: 440,
    endFrame: 678,
    keyframes: [
        { frame: 440, x: 600, y: 960, width: 350, height: 55 },
        { frame: 678, x: 600, y: 960, width: 350, height: 55 },
    ]
};

const getKeyframeValue = (frame: number, keyframes: Keyframe[], property: keyof Keyframe) => {
    const sorted = [...keyframes].sort((a, b) => a.frame - b.frame);
    if (frame <= sorted[0].frame) return sorted[0][property];
    if (frame >= sorted[sorted.length - 1].frame) return sorted[sorted.length - 1][property];

    for (let i = 0; i < sorted.length - 1; i++) {
        const start = sorted[i];
        const end = sorted[i + 1];
        if (frame >= start.frame && frame <= end.frame) {
            return interpolate(frame, [start.frame, end.frame], [start[property], end[property]]);
        }
    }
    return sorted[0][property];
};

export const Section1b_Traceability: React.FC<{ hideBlip?: boolean }> = ({ hideBlip = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const isRing1Visible = frame >= RING_1_SETTINGS.startFrame && frame <= RING_1_SETTINGS.endFrame;
    const isRing2Visible = frame >= RING_2_SETTINGS.startFrame && frame <= RING_2_SETTINGS.endFrame;

    const lineAnim = spring({
        frame: frame - 10,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const revealAnim = spring({
        frame: frame - 15,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const lineHeight = interpolate(lineAnim, [0, 1], [0, 45]); // Shorter line since subtitle is hidden

    const { durationInFrames } = useVideoConfig();

    // Fade in content quickly at the start
    const contentFade = spring({
        frame: frame - 5, // Start fading in earlier (at frame 5 instead of 15)
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    // Exit animation: fade out in the last 30 frames of THIS sequence
    const exitAnim = interpolate(
        frame,
        [durationInFrames - 30, durationInFrames - 5],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background }}>
            <AbsoluteFill style={{
                padding: '150px 60px 60px 60px',
                opacity: contentFade * exitAnim,
            }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    top: 60,
                    left: 60,
                    width: 4,
                    height: lineHeight,
                    backgroundColor: COLOR_TOKENS.primary,
                    opacity: interpolate(lineAnim, [0, 0.1], [0, 1]),
                }} />

                {/* Header Content */}
                <div style={{
                    position: 'absolute',
                    top: 60,
                    left: 80,
                    opacity: revealAnim,
                    clipPath: `inset(0 ${100 - revealAnim * 100}% 0 0)`, // Reveal from left
                    transform: `translateX(${interpolate(revealAnim, [0, 1], [-20, 0])}px)`,
                }}>
                    <Typography text="Complete Vehicle Traceability" fontSize={30} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                    {/* <Typography text="Material Specific Circularity" fontSize={24} color={COLOR_TOKENS.textSecondary} fontWeight={400} textAlign="left" /> */}
                </div>

                {/* Recording Blip - Top Right */}
                {!hideBlip && (
                    <div style={{ 
                        position: 'absolute',
                        top: 60,
                        right: 60,
                        zIndex: 20
                    }}>
                        <RecordingBlip />
                    </div>
                )}

            {/* Recycled Material Highlights */}
            {isRing1Visible && (
                <div style={{ 
                    position: 'absolute', 
                    left: getKeyframeValue(frame, RING_1_SETTINGS.keyframes, 'x'), 
                    top: getKeyframeValue(frame, RING_1_SETTINGS.keyframes, 'y'), 
                    transform: 'translate(-50%, -50%)', 
                    zIndex: 30 
                }}>
                    <HighlightRing 
                        width={getKeyframeValue(frame, RING_1_SETTINGS.keyframes, 'width')} 
                        height={getKeyframeValue(frame, RING_1_SETTINGS.keyframes, 'height')} 
                    />
                </div>
            )}

            {isRing2Visible && (
                <div style={{ 
                    position: 'absolute', 
                    left: getKeyframeValue(frame, RING_2_SETTINGS.keyframes, 'x'), 
                    top: getKeyframeValue(frame, RING_2_SETTINGS.keyframes, 'y'), 
                    transform: 'translate(-50%, -50%)', 
                    zIndex: 30 
                }}>
                    <HighlightRing 
                        width={getKeyframeValue(frame, RING_2_SETTINGS.keyframes, 'width')} 
                        height={getKeyframeValue(frame, RING_2_SETTINGS.keyframes, 'height')} 
                    />
                </div>
            )}

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{
                        flex: 1,
                        background: 'white',
                        borderRadius: '0 24px 24px 24px',
                        border: `1px solid ${COLOR_TOKENS.border}`,
                        boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <OffthreadVideo
                            src={staticFile('my_media/Traceability-Updated_HD.mp4')}
                            playbackRate={0.72}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center'
                            }}
                        />
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
