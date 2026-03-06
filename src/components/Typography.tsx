import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';

const { fontFamily } = loadFont();

interface TypographyProps {
    text: string;
    fontSize?: number;
    fontWeight?: string | number;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    delay?: number;
    letterSpacing?: number;
    masked?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
    text,
    fontSize = 48,
    fontWeight = 'bold',
    color = COLOR_TOKENS.text,
    textAlign = 'center',
    delay = 0,
    letterSpacing = -1,
    masked = true,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    const translateY = interpolate(anim, [0, 1], [fontSize * 0.8, 0]);
    const opacity = interpolate(anim, [0, 0.5], [0, 1]);

    const content = (
        <div
            style={{
                fontFamily,
                fontSize,
                fontWeight,
                color,
                textAlign,
                opacity,
                transform: `translateY(${translateY}px)`,
                width: '100%',
                letterSpacing,
                lineHeight: 1.1,
            }}
        >
            {text}
        </div>
    );

    if (masked) {
        return (
            <div style={{ overflow: 'hidden', width: '100%', padding: '10px 0' }}>
                {content}
            </div>
        );
    }

    return content;
};
