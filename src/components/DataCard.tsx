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

    const anim = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    const translateY = interpolate(anim, [0, 1], [30, 0]);
    const opacity = interpolate(anim, [0, 0.4], [0, 1]);
    const blur = interpolate(anim, [0, 0.4], [10, 0]);

    // Content stagger
    const contentAnim = spring({
        frame: frame - delay - 10,
        fps,
        config: ANIMATION_TOKENS.premium,
    });
    const subTranslateY = interpolate(contentAnim, [0, 1], [10, 0]);
    const subOpacity = interpolate(contentAnim, [0, 0.5], [0, 1]);

    return (
        <div
            style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: 20,
                padding: '24px 32px',
                minWidth: 260,
                border: `1px solid ${COLOR_TOKENS.border}`,
                boxShadow: `0 10px 40px ${COLOR_TOKENS.shadow}`,
                opacity,
                transform: `translateY(${translateY}px)`,
                filter: `blur(${blur}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: subOpacity,
                transform: `translateY(${subTranslateY}px)`,
            }}>
                <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLOR_TOKENS.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontFamily: 'Inter, sans-serif'
                }}>{title}</span>
                {icon && <div style={{ color: COLOR_TOKENS.primary }}>{icon}</div>}
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                opacity: subOpacity,
                transform: `translateY(${subTranslateY}px)`,
            }}>
                <span style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: COLOR_TOKENS.text,
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: -2
                }}>{value}</span>
                {unit && <span style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: COLOR_TOKENS.textSecondary,
                    fontFamily: 'Inter, sans-serif'
                }}>{unit}</span>}
            </div>
        </div>
    );
};
