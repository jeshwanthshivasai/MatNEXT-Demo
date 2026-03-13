import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../../components/Typography';
import { PulsatingGrid } from '../../components/overhaul/PulsatingGrid';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

export const Section1_Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const scale = interpolate(anim, [0, 1], [1.1, 1]);
    const opacity = interpolate(anim, [0, 0.5], [0, 1]);

    // Exit animation (Fade out before transition)
    const exitAnim = interpolate(frame, [120, 150], [1, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            backgroundColor: COLOR_TOKENS.background,
        }}>
            {/* Pulsating Grid Background */}
            <PulsatingGrid />

            <AbsoluteFill style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: `scale(${interpolate(anim, [0, 1], [0.9, 1])})`,
                    opacity: opacity * exitAnim,
                }}>
                    <Typography
                        text="MatNEXT"
                        fontSize={144}
                        fontWeight={500}
                        color={COLOR_TOKENS.primary}
                        letterSpacing={-8}
                    />
                    <div style={{
                        marginTop: 5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        opacity: 1
                    }}>
                        {/* Left Decoration Line */}
                        <div style={{
                            width: interpolate(anim, [0, 1], [0, 150]),
                            height: 2,
                            background: `linear-gradient(90deg, transparent, ${COLOR_TOKENS.primary})`,
                            opacity: exitAnim,
                        }} />

                        <Typography
                            text="Stands for MaterialNEXT"
                            fontSize={24}
                            fontWeight={400}
                            letterSpacing={0}
                            color={COLOR_TOKENS.primary}
                        />

                        {/* Right Decoration Line */}
                        <div style={{
                            width: interpolate(anim, [0, 1], [0, 150]),
                            height: 2,
                            background: `linear-gradient(90deg, ${COLOR_TOKENS.primary}, transparent)`,
                            opacity: exitAnim,
                        }} />
                    </div>
                </div>

                <div style={{ marginTop: 25, opacity: exitAnim }}>
                    <Typography
                        delay={30}
                        text="Intelligent Material Traceability System"
                        fontSize={32}
                        color={COLOR_TOKENS.textSecondary}
                        fontWeight={500}
                        letterSpacing={-1}
                    />
                </div>
            </AbsoluteFill>

            {/* Website URL */}
            <div style={{
                position: 'absolute',
                bottom: 130,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' }) * exitAnim,
                transform: `translateY(${interpolate(frame, [40, 60], [20, 0], { extrapolateRight: 'clamp' })}px)`,
            }}>
                <p style={{
                    color: COLOR_TOKENS.primary,
                    fontWeight: 400,
                    fontSize: 20,
                    fontFamily: 'Inter, sans-serif',
                    margin: 0,
                    letterSpacing: 1
                }}>
                    www.matnext-app.com
                </p>
            </div>
            <div style={{
                position: 'absolute',
                bottom: 100,
                left: '50%',
                transform: 'translateX(-50%)',
                width: interpolate(anim, [0, 1], [0, 400]),
                height: 2,
                background: `linear-gradient(90deg, transparent, ${COLOR_TOKENS.primary}, transparent)`,
                opacity: exitAnim,
            }} />
        </AbsoluteFill>
    );
};
