import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLOR_TOKENS } from '../../style/tokens';

export const RecordingBlip: React.FC = () => {
    const frame = useCurrentFrame();

    // Pulsation effect (sin wave)
    const pulsation = (Math.sin(frame / 10) + 1) / 2;
    const dotOpacity = interpolate(pulsation, [0, 1], [0.3, 1]);
    const dotScale = interpolate(pulsation, [0, 1], [0.8, 1.2]);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 1000 }}>
            <div style={{
                position: 'absolute',
                top: 75,
                right: 60,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '12px 20px',
                borderRadius: 40,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                {/* Red Dot */}
                <div style={{
                    width: 14,
                    height: 14,
                    backgroundColor: '#FF3B30',
                    borderRadius: '50%',
                    opacity: dotOpacity,
                    transform: `scale(${dotScale})`,
                    boxShadow: '0 0 15px #FF3B30'
                }} />

                {/* REC Label
                <span style={{
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: 2
                }}>
                    REC
                </span>

                <div style={{
                    width: 1,
                    height: 24,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    margin: '0 8px'
                }} /> */}

                {/* Subtitle Label */}
                <span style={{
                    color: '#96cc39',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 20,
                    fontWeight: 500,
                    opacity: 1
                }}>
                    Actual Data
                </span>
            </div>
        </AbsoluteFill>
    );
};
