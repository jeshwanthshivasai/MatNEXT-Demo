import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface GlassCardProps {
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
    delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
    children, 
    width = 'auto', 
    height = 'auto',
    delay = 0 
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entry animation (Scale and Move)
    const anim = interpolate(frame - delay, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Suble 3D tilt effect based on frame
    const rotateY = interpolate(frame, [0, 1500], [-5, 5]);
    const rotateX = interpolate(frame, [0, 1500], [2, -2]);

    return (
        <div style={{
            width,
            height,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            transform: `
                perspective(1000px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                scale(${interpolate(anim, [0, 1], [0.8, 1])})
                translateY(${interpolate(anim, [0, 1], [40, 0])}px)
            `,
            opacity: anim,
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Glowing Edge Effect */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(150, 204, 57, 0.1) 0%, transparent 70%)',
                opacity: interpolate(Math.sin(frame / 20), [-1, 1], [0.3, 0.6]),
                pointerEvents: 'none'
            }} />
            
            {children}
        </div>
    );
};
