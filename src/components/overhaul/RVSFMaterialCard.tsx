import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

const DATA = [
    { label: 'Total Weight (Kgs)', value: '6,974.00' },
    { label: 'Mix Steel (Kgs)', value: '4,526.94' },
    { label: 'Aluminium (Kgs)', value: '410.63' },
    { label: 'Hazardous Waste (Kgs)', value: '428.84' },
    { label: 'Shell & Painted Steel (Kgs)', value: '479.38' },
    { label: 'Plastic Scrap (Kgs)', value: '200.20' },
];

export const RVSFMaterialCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
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
            border: '2px solid #F59E0B',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            opacity: entrance,
            transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
            fontFamily,
        }}>
            <div style={{
                color: '#D97706',
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                borderBottom: '1px solid #FDE68A',
                paddingBottom: 8,
            }}>
                Material Recovery Details (Kgs):
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {DATA.map((item, i) => (
                    <div key={item.label} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 14,
                        fontWeight: i === 0 ? 700 : 500,
                        color: i === 0 ? '#1A1A1A' : '#4B5563',
                        padding: '4px 0',
                        borderBottom: i === DATA.length - 1 ? 'none' : '1px solid #F3F4F6'
                    }}>
                        <span>{item.label}</span>
                        <span style={{ 
                            color: i === 0 ? '#F59E0B' : '#1A1A1A',
                            fontWeight: 700,
                            fontVariantNumeric: 'tabular-nums'
                        }}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
