import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLOR_TOKENS } from '../../style/tokens';
import { Typography } from '../Typography';

interface DataOverlayProps {
    data: {
        id?: string;
        location?: string;
        transport?: string;
        batchId?: string;
        invoiceId?: string;
    };
    delay?: number;
}

export const DataOverlay: React.FC<DataOverlayProps> = ({ data, delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const openSpring = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    if (frame < delay) return null;

    return (
        <div style={{
            position: 'absolute',
            width: 280,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '20px',
            transformOrigin: 'left center',
            transform: `scale(${openSpring})`,
            opacity: openSpring,
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
        }}>
            <div style={{ 
                opacity: interpolate(openSpring, [0.4, 0.8], [0, 1]),
                marginBottom: 4
             }}>
                <Typography text="VERIFIED DATA" fontSize={11} color={COLOR_TOKENS.primary} fontWeight={800} letterSpacing={1} />
            </div>

            {Object.entries(data).map(([key, value], i) => {
                const start = Math.min(0.5 + i * 0.05, 0.8);
                return (
                    <div key={key} style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        opacity: interpolate(openSpring, [start, 1], [0, 1], { extrapolateLeft: 'clamp' }),
                        gap: '2px'
                    }}>
                        <Typography 
                            text={key.toUpperCase().replace('ID', ' ID')} 
                            fontSize={10} 
                            color="rgba(0,0,0,0.4)" 
                            fontWeight={700} 
                        />
                        <Typography 
                            text={value as string} 
                            fontSize={14} 
                            color="#111" 
                            fontWeight={600} 
                        />
                    </div>
                );
            })}

            {/* Glowing accent dot */}
            <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: COLOR_TOKENS.primary,
                boxShadow: `0 0 10px ${COLOR_TOKENS.primary}`
            }} />
        </div>
    );
};
