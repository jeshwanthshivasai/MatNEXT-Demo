import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLOR_TOKENS } from '../../style/tokens';

export const CircularLoop: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <div style={{
            position: 'absolute',
            width: 800,
            height: 800,
            borderRadius: '50%',
            border: `2px solid ${COLOR_TOKENS.primary}22`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* Main Outer Ring */}
            <svg width="800" height="800" viewBox="0 0 800 800" style={{ position: 'absolute' }}>
                <circle
                    cx="400"
                    cy="400"
                    r="350"
                    fill="none"
                    stroke={COLOR_TOKENS.primary}
                    strokeWidth="4"
                    strokeDasharray="10 20"
                    style={{
                        transformOrigin: 'center',
                        transform: `rotate(${frame * 0.5}deg)`,
                        opacity: 0.3
                    }}
                />
                
                {/* Animated Flow Segment */}
                <path
                    d="M 400,50 A 350,350 0 0,1 750,400"
                    fill="none"
                    stroke={COLOR_TOKENS.primary}
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{
                        transformOrigin: 'center',
                        transform: `rotate(${frame * 2}deg)`,
                        filter: 'drop-shadow(0 0 10px #96CC39)'
                    }}
                />
            </svg>

            {/* Pulsating Core */}
            <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${COLOR_TOKENS.primary}22 0%, transparent 70%)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `scale(${interpolate(Math.sin(frame / 10), [-1, 1], [0.9, 1.1])})`
            }}>
                <div style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: COLOR_TOKENS.primary,
                    opacity: 0.1
                }} />
            </div>

            {/* Floating Labels */}
            {[0, 90, 180, 270].map((angle, i) => {
                const radian = (angle * Math.PI) / 180;
                const x = 350 * Math.cos(radian);
                const y = 350 * Math.sin(radian);
                
                const labels = ["RECOVERY", "RECYCLING", "PRODUCTION", "ASSEMBLY"];

                return (
                    <div key={angle} style={{
                        position: 'absolute',
                        transform: `translate(${x}px, ${y}px)`,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: `1px solid ${COLOR_TOKENS.primary}44`,
                        color: 'white',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 18,
                        fontWeight: 600,
                        letterSpacing: 2
                    }}>
                        {labels[i]}
                    </div>
                );
            })}
        </div>
    );
};
