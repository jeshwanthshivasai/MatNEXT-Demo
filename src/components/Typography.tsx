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
}

export const Typography: React.FC<TypographyProps> = ({
    text,
    fontSize = 48,
    fontWeight = 'bold',
    color = COLOR_TOKENS.text,
    textAlign = 'center',
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.spring,
    });

    const translateY = interpolate(
        opacity,
        [0, 1],
        [20, 0]
    );

    return (
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
            }}
        >
            {text}
        </div>
    );
};
