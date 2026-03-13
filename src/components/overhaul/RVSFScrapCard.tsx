import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

const DATA = [
    { label: 'Steel (Kgs) =', value: '730,070', rating: '9.0' },
    { label: 'Plastic (Kgs) =', value: '18,684', rating: '7.5' },
    { label: 'Cast Iron (Kgs) =', value: '0', rating: '8.2' },
    { label: 'Li-Ion Batteries (Kgs) =', value: '0', rating: '8.5' },
    { label: 'Other materials (Kgs) =', value: '0', rating: '0' },
];

export const RVSFScrapCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: 16,
            border: '2px solid #3b82f6',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            opacity: entrance,
            transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
            fontFamily: 'Inter, sans-serif',
        }}>
            <div style={{
                color: '#1d4ed8',
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                borderBottom: '1px solid #dbeafe',
                paddingBottom: 8,
                textDecoration: 'underline'
            }}>
                Scrap Dispatch Details:
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DATA.map((item, i) => (
                    <div key={item.label} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#1d4ed8',
                        padding: '4px 0',
                        borderBottom: i === DATA.length - 1 ? 'none' : '1px solid #eff6ff'
                    }}>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ 
                                color: '#1e3a8a',
                                fontWeight: 700,
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                {item.value}
                            </span>
                            <div style={{
                                width: 45,
                                textAlign: 'right',
                                color: '#166534',
                                fontSize: 13,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                {item.rating !== '0' && <span style={{ color: '#F59E0B' }}>★</span>}
                                {item.rating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
