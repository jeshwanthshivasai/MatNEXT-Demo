import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

const DATA = [
    { label: 'No. of Vehicles Scrapped =', value: '6,607' },
    { label: 'Inventory (MT/kg/Nos.) =', value: '6,607 Nos' },
    { label: 'No. of COD generated =', value: '8,807' },
    { label: 'No. of MSIL Test Vehicles Scrapped =', value: '242' },
    { label: 'No. of collection centres (tab - state wise)', value: '54' },
    { label: 'Process Loss', value: '-' },
];

export const RVSFPerformanceCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    const progressAnim = spring({
        frame: frame - (delay + 30),
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: 16,
            border: '2px solid #84cc16',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            opacity: entrance,
            transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
            fontFamily: 'Inter, sans-serif',
        }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {DATA.map((item, i) => (
                    <div key={item.label} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#4B5563',
                        padding: '4px 0',
                        borderBottom: '1px solid #F3F4F6'
                    }}>
                        <span>{item.label}</span>
                        <span style={{ 
                            color: '#166534',
                            fontWeight: 700,
                            fontVariantNumeric: 'tabular-nums'
                        }}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Performance Rating Footer */}
            <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>Performance Rating</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>101.115% of Target</span>
                </div>
                <div style={{
                    width: '100%',
                    height: 8,
                    backgroundColor: '#ECFDF5',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '100%',
                        backgroundColor: '#96CC39',
                        transform: `scaleX(${progressAnim})`,
                        transformOrigin: 'left center'
                    }} />
                </div>
            </div>
        </div>
    );
};
