import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';

export const Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    const scale = interpolate(anim, [0, 1], [0.8, 1]);
    const opacity = interpolate(anim, [0, 0.4], [0, 1]);

    const dividerWidth = interpolate(
        spring({ frame: frame - 30, fps, config: ANIMATION_TOKENS.slow }),
        [0, 1],
        [0, 600]
    );

    return (
        <AbsoluteFill style={{
            backgroundColor: COLOR_TOKENS.background,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* Logo Reveal with Masking logic built into Typography's new state */}
            <div style={{
                transform: `scale(${scale})`,
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography
                    text="MatNEXT"
                    fontSize={128}
                    fontWeight={500}
                    color={COLOR_TOKENS.primary}
                    delay={0}
                    letterSpacing={-8}
                />
            </div>

            {/* Tagline - Staggered */}
            <div style={{ marginTop: 20, width: '100%' }}>
                <Typography
                    delay={45}
                    text="Powering the Circular Automotive Supply Chain"
                    fontSize={32}
                    color={COLOR_TOKENS.textSecondary}
                    fontWeight={500}
                    letterSpacing={-0.5}
                />
            </div>

            {/* Premium Animated Bottom Bar */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                height: 1,
                width: dividerWidth,
                background: `linear-gradient(to right, transparent, ${COLOR_TOKENS.primary}, transparent)`,
                opacity: interpolate(dividerWidth, [0, 600], [0, 0.4]),
            }} />
        </AbsoluteFill>
    );
};
