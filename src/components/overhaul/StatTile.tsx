import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

interface StatTileProps {
    label: string;
    subLabel: string;
    value: string;
    unit: string;
    targetText: string;
    percentage: number;
    color: string;
    icon: React.ReactNode;
    delay?: number;
}

export const StatTile: React.FC<StatTileProps> = ({
    label,
    subLabel,
    value,
    unit,
    targetText,
    percentage,
    color,
    icon,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    const progressAnim = spring({
        frame: frame - (delay + 20),
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = interpolate(
        progressAnim,
        [0, 1],
        [circumference, circumference - (percentage / 100) * circumference]
    );

    return (
        <div style={{
            flex: 1,
            height: '100%',
            backgroundColor: 'white',
            borderRadius: 16,
            borderLeft: `6px solid ${color}`,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            opacity: entrance,
            transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
        }}>
            {/* Header: Icon + Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: `${color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color
                }}>
                    {icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: COLOR_TOKENS.textSecondary,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase'
                    }}>{label}</span>
                    <span style={{
                        fontSize: 15,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: COLOR_TOKENS.textSecondary,
                    }}>{subLabel}</span>
                </div>
            </div>

            {/* Main Content: Value + Progress Ring */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{
                            fontSize: 32,
                            fontWeight: 800,
                            color: color,
                            textTransform: 'uppercase',
                        }}>{value}</span>
                        <span style={{
                            fontSize: 15,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: COLOR_TOKENS.textSecondary
                        }}>{unit}</span>
                    </div>
                    <span style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: COLOR_TOKENS.textSecondary,
                        marginTop: 4,
                        textTransform: 'uppercase',
                    }}>{targetText}</span>
                </div>

                {/* Progress Ring (Unclipped and Vertically Centered) */}
                <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                    <svg width="80" height="80" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Background Circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke="#F3F4F6"
                            strokeWidth="10"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke={color}
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 800,
                        color: color
                    }}>
                        {Math.round(percentage * progressAnim)}%
                    </div>
                </div>
            </div>
        </div>
    );
};
