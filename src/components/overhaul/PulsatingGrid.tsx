import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLOR_TOKENS } from '../../style/tokens';

export const PulsatingGrid: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const ROWS = 30;
    const COLS = 50;
    const SPACING_X = width / COLS;
    const SPACING_Y = height / ROWS;

    return (
        <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: COLOR_TOKENS.background }}>
            {Array.from({ length: ROWS }).map((_, i) => (
                Array.from({ length: COLS }).map((_, j) => {
                    const baseUrlX = j * SPACING_X;
                    const baseUrlY = i * SPACING_Y;

                    // Organic "Turbulent" motion
                    // Use trig functions with different frequencies to simulate randomness
                    const noiseX = Math.sin(frame / 20 + i * 0.5) * 10 + Math.cos(frame / 30 + j * 0.3) * 5;
                    const noiseY = Math.cos(frame / 25 + j * 0.4) * 10 + Math.sin(frame / 35 + i * 0.2) * 5;

                    // Wave pulse based on distance from center
                    const centerX = COLS / 2;
                    const centerY = ROWS / 2;
                    const distance = Math.sqrt(Math.pow(j - centerX, 2) + Math.pow(i - centerY, 2));

                    // The "Wave" pulse
                    const wave = Math.sin(frame / 15 - distance / 3) * 0.5 + 0.5;

                    // Appearance properties
                    const size = interpolate(wave, [0, 1], [2, 5]);
                    const opacity = interpolate(wave, [0, 1], [0.1, 0.4]);

                    // Color variation (Subtle mix of grey and primary)
                    const color = wave > 0.8 ? COLOR_TOKENS.primary : '#D1D5DB';

                    return (
                        <div
                            key={`${i}-${j}`}
                            style={{
                                position: 'absolute',
                                left: baseUrlX + noiseX,
                                top: baseUrlY + noiseY,
                                width: size,
                                height: size,
                                borderRadius: '50%',
                                backgroundColor: color,
                                opacity,
                                transform: 'translate(-50%, -50%)',
                                // NO SHADOW AS REQUESTED
                            }}
                        />
                    );
                })
            ))}
        </AbsoluteFill>
    );
};
