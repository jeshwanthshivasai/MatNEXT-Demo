import React from 'react';
import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, OffthreadVideo, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { RecordingBlip } from '../../components/overhaul/RecordingBlip';

export const Section1b_Traceability: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

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

    // Exit animation: fade out in the last 30 frames of THIS sequence (240f)
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
                <div style={{ 
                    position: 'absolute',
                    top: 60,
                    right: 60,
                    zIndex: 20
                }}>
                    <RecordingBlip />
                </div>

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
                            playbackRate={1.75}
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
