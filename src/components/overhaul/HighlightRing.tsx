import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLOR_TOKENS } from '../../style/tokens';

interface HighlightRingProps {
    width?: number;
    height?: number;
    delay?: number;
}

export const HighlightRing: React.FC<HighlightRingProps> = ({ 
    width = 120, 
    height = 120,
    delay = 0 
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame: frame - delay,
        fps,
        config: {
            stiffness: 100,
            damping: 10,
        },
    });

    const scale = interpolate(anim, [0, 1], [0.8, 1]);
    const opacity = interpolate(anim, [0, 0.5, 1], [0, 1, 1]);
    
    // Pulsating effect after entry
    const pulse = Math.sin((frame - delay) / 5) * 0.05;

    return (
        <div style={{
            width,
            height,
            borderRadius: '20px',
            border: `6px solid ${COLOR_TOKENS.primary}`,
            boxShadow: `0 0 20px ${COLOR_TOKENS.primary}66`, // 40% opacity
            opacity: opacity * (1 - pulse),
            transform: `scale(${scale + pulse})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} />
    );
};
