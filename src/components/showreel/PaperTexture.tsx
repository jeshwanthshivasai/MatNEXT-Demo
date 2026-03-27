import React from 'react';
import { AbsoluteFill } from 'remotion';

export const PaperTexture: React.FC = () => {
    return (
        <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
            {/* Base Paper Color */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#f4f1ea',
                backgroundBlendMode: 'multiply'
            }} />
            
            {/* Subtle Grain / Texture */}
            <svg width="100%" height="100%" style={{ opacity: 0.1, position: 'absolute' }}>
                <filter id="paper-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#paper-grain)" />
            </svg>

            {/* Subtle Grid for "Blueprint" feel */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }} />
        </AbsoluteFill>
    );
};
