import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';

export const Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    const scale = interpolate(anim, [0, 1], [0.8, 1]);
    const opacity = interpolate(anim, [0, 0.4], [0, 1]);

    return (
        <AbsoluteFill style={{
            backgroundColor: COLOR_TOKENS.background,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* Logo Reveal - Refined */}
            <div style={{
                transform: `scale(${scale})`,
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography
                    text="MatNEXT"
                    fontSize={160}
                    fontWeight={500}
                    color={COLOR_TOKENS.primary}
                    delay={0}
                    letterSpacing={-8}
                />
            </div>

            {/* Final CTA - Staggered */}
            <div style={{ marginTop: 20, width: '100%' }}>
                <Typography
                    delay={45}
                    text="Transforming Compliance into Competitive Advantage."
                    fontSize={32}
                    color={COLOR_TOKENS.text}
                    fontWeight={600}
                    letterSpacing={-1}
                />
                {/* <Typography
                    delay={60}
                    text="Ready for the 2026 ESG Roadmap."
                    fontSize={24}
                    color={COLOR_TOKENS.textSecondary}
                    fontWeight={500}
                    letterSpacing={-0.5}
                /> */}
            </div>

            {/* Web URL - Entrance refined */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                fontSize: 20,
                color: COLOR_TOKENS.textSecondary,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: 1,
                opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `translateY(${interpolate(frame, [120, 150], [10, 0], { extrapolateRight: 'clamp' })}px)`,
            }}>
                www.matnext-app.com
            </div>
        </AbsoluteFill>
    );
};
