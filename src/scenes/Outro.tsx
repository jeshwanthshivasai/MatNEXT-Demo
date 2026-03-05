import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';

export const Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoScale = spring({
        frame,
        fps,
        config: ANIMATION_TOKENS.spring,
    });

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

            {/* CTA */}
            <div style={{ marginTop: 60, width: '100%' }}>
                <Typography
                    delay={60}
                    text="Transforming Compliance into Competitive Advantage."
                    fontSize={32}
                    color={COLOR_TOKENS.text}
                    fontWeight={600}
                />
                <Typography
                    delay={90}
                    text="Ready for the 2026 ESG Roadmap."
                    fontSize={24}
                    color={COLOR_TOKENS.textSecondary}
                    fontWeight={500}
                />
            </div>

            {/* Contact / URL */}
            <div style={{
                position: 'absolute',
                bottom: 80,
                fontSize: 18,
                color: COLOR_TOKENS.textSecondary,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' })
            }}>
                www.matnext-app.com
            </div>
        </AbsoluteFill>
    );
};
