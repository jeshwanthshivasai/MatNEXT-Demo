import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';

export const Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoScale = spring({
        frame,
        fps,
        config: ANIMATION_TOKENS.spring,
    });

    const dividerWidth = interpolate(
        spring({ frame: frame - 30, fps, config: ANIMATION_TOKENS.spring }),
        [0, 1],
        [0, 400]
    );

    return (
        <AbsoluteFill style={{
            backgroundColor: COLOR_TOKENS.background,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* Logos & Brand Reveal */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                transform: `scale(${logoScale})`,
                opacity: logoScale,
            }}>
                {/* MatNEXT Logo */}
                <div style={{
                    fontSize: 64,
                    fontWeight: 900,
                    color: COLOR_TOKENS.primary,
                    fontFamily: 'Inter, sans-serif'
                }}>
                    MatNEXT
                </div>
            </div>

            {/* Tagline */}
            <div style={{ marginTop: 60, width: '100%' }}>
                <Typography
                    delay={60}
                    text="Powering the Circular Automotive Supply Chain"
                    fontSize={32}
                    color={COLOR_TOKENS.textSecondary}
                    fontWeight={500}
                />
            </div>

            {/* Animated Gradient Bar at the bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 8,
                width: `${dividerWidth * 5}px`, // Max 2000px
                background: `linear-gradient(to right, ${COLOR_TOKENS.primary}, transparent)`,
                opacity: 0.6
            }} />
        </AbsoluteFill>
    );
};
