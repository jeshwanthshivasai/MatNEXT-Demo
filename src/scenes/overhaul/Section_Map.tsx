import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Video, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

export const Section_Map: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const lineAnim = spring({
        frame: frame - 10,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const revealAnim = spring({
        frame: frame - 25,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const focusAnim = spring({
        frame: frame, // Appear immediately with video start
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const overlayOpacity = interpolate(focusAnim, [0, 1], [0, 0.4]);
    const lineHeight = interpolate(lineAnim, [0, 1], [0, 95]);

    // Duration is 150 frames as planned in Composition.tsx
    const DURATION = 150;
    const exitAnim = interpolate(frame, [DURATION - 20, DURATION], [1, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background, opacity: exitAnim }}>
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

            {/* Header */}
            <div style={{
                position: 'absolute',
                top: 60,
                left: 80,
                opacity: revealAnim,
                clipPath: `inset(0 ${100 - revealAnim * 100}% 0 0)`,
                transform: `translateX(${interpolate(revealAnim, [0, 1], [-20, 0])}px)`,
            }}>
                <Typography text="Registered Vehicle Scrapping Facility" fontSize={30} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                <Typography delay={15} text="Map View" fontSize={24} color={COLOR_TOKENS.textSecondary} fontWeight={400} textAlign="left" />
            </div>

            {/* Toggle (matches RVSF dashboard position) */}
            <div style={{
                position: 'absolute',
                top: 60,
                right: 60,
                zIndex: 10,
            }}>
                <Toggle mode="corporate" />
            </div>

            <AbsoluteFill style={{
                padding: '160px 60px 60px 60px',
            }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    {/* ToasterTabs matching RVSF Dashboard (Index 1) */}
                    <ToasterTabs activeIndex={1} />

                    <div style={{
                        flex: 1,
                        background: 'white',
                        borderRadius: '0 24px 24px 24px',
                        border: `1px solid ${COLOR_TOKENS.border}`,
                        boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <Video
                            src={staticFile('new_media/RVSF_Map.mp4')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />

                        {/* Highlight Ring (Focusing on central cluster) */}
                        <div style={{
                            position: 'absolute',
                            top: '23%',
                            left: '4%',
                            width: '96%',
                            height: '59%',
                            border: `6px solid ${COLOR_TOKENS.primary}`,
                            borderRadius: 20,
                            boxShadow: `0 0 0 1000px rgba(0,0,0,${overlayOpacity * 1.5})`,
                            transform: `scale(${focusAnim})`,
                            opacity: focusAnim,
                            zIndex: 10,
                        }} />
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
