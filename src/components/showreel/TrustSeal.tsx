import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLOR_TOKENS } from '../../style/tokens';

export const TrustSeal: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <div style={{
            width: 300,
            height: 300,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `rotateY(${frame * 2}deg)`
        }}>
            {/* Hexagonal Shield Background */}
            <svg width="300" height="300" viewBox="0 0 100 100">
                <path
                    d="M 50,5 L 90,25 L 90,75 L 50,95 L 10,75 L 10,25 Z"
                    fill="none"
                    stroke={COLOR_TOKENS.primary}
                    strokeWidth="2"
                    style={{
                        filter: 'drop-shadow(0 0 8px #96CC39)',
                        opacity: interpolate(Math.sin(frame / 5), [-1, 1], [0.4, 0.8])
                    }}
                />
                
                {/* Internal Verified Checkmark */}
                <path
                    d="M 30,50 L 45,65 L 70,35"
                    fill="none"
                    stroke={COLOR_TOKENS.primary}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        strokeDasharray: 100,
                        strokeDashoffset: interpolate(frame, [0, 40], [100, 0], { extrapolateRight: 'clamp' })
                    }}
                />
            </svg>

            {/* Glowing Aura */}
            <div style={{
                position: 'absolute',
                width: '120%',
                height: '120%',
                background: `radial-gradient(circle, ${COLOR_TOKENS.primary}11 0%, transparent 60%)`,
                borderRadius: '50%'
            }} />
        </div>
    );
};
