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
                    transform: `scale(${interpolate(anim, [0, 1], [0.9, 1])})`,
                    opacity,
                }}>
                    <Typography
                        text="MatNEXT"
                        fontSize={128}
                        fontWeight={500}
                        color={COLOR_TOKENS.primary}
                        letterSpacing={-8}
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <Typography
                        delay={30}
                        text="Circular Supply Chain Intelligence"
                        fontSize={32}
                        color={COLOR_TOKENS.textSecondary}
                        fontWeight={500}
                        letterSpacing={-1}
                    />
                </div>
            </AbsoluteFill>

            {/* Bottom Accent */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                left: '50%',
                transform: 'translateX(-50%)',
                width: interpolate(anim, [0, 1], [0, 400]),
                height: 2,
                background: `linear-gradient(90deg, transparent, ${COLOR_TOKENS.primary}, transparent)`,
                opacity: 0.5,
            }} />
        </AbsoluteFill>
    );
};
