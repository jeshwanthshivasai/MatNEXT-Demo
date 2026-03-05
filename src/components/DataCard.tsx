import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';

interface DataCardProps {
    title: string;
    value: string;
    unit?: string;
    icon?: React.ReactNode;
    delay?: number;
}

export const DataCard: React.FC<DataCardProps> = ({
    title,
    value,
    unit,
    icon,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.spring,
    });

    const translateY = interpolate(scale, [0, 1], [40, 0]);

    return (
        <div
            style={{
                background: COLOR_TOKENS.surface,
                borderRadius: 24,
                padding: '32px 40px',
                boxShadow: `0 10px 40px ${COLOR_TOKENS.shadow}`,
                border: `1px solid ${COLOR_TOKENS.border}`,
                width: 320,
                height: 240,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transform: `scale(${scale}) translateY(${translateY}px)`,
                opacity: scale,
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    fontSize: 18,
                    color: COLOR_TOKENS.textSecondary,
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif'
                }}>
                    {title}
                </div>
                {icon && <div style={{ color: COLOR_TOKENS.primary }}>{icon}</div>}
            </div>
            <div>
                <div style={{
                    fontSize: 48,
                    fontWeight: 'bold',
                    color: COLOR_TOKENS.text,
                    lineHeight: 1,
                    fontFamily: 'Inter, sans-serif'
                }}>
                    {value}
                </div>
                {unit && (
                    <div style={{
                        fontSize: 14,
                        color: COLOR_TOKENS.textSecondary,
                        marginTop: 8,
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        {unit}
                    </div>
                )}
            </div>
        </div>
    );
};
