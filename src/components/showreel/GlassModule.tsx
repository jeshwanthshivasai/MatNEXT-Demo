import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../Typography';
import { COLOR_TOKENS } from '../../style/tokens';

interface GlassModuleProps {
    x: number;
    y: number;
    width: number;
    height: number;
    depth: number;
    label: string;
    statValue?: string;
    statLabel?: string;
    children?: React.ReactNode;
}

export const GlassModule: React.FC<GlassModuleProps> = ({ 
    x, y, width, height, depth, label, statValue, statLabel, children 
}) => {
    const frame = useCurrentFrame();

    // Isometric transform styles
    const isoTransform = 'rotateX(60deg) rotateZ(45deg)';

    return (
        <div style={{
            position: 'absolute',
            left: x,
            top: y,
            transformStyle: 'preserve-3d',
            transform: `translate(-50%, -50%)`,
        }}>
            {/* 3D Glass Box - 45-degree Isometric Simulation */}
            <div style={{
                position: 'relative',
                width,
                height,
                transformStyle: 'preserve-3d',
                transform: isoTransform,
            }}>
                {/* Bottom Face (Floor of box) */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.1)',
                }} />

                {/* Left Face */}
                <div style={{
                    position: 'absolute',
                    width: depth,
                    height: '100%',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    transformOrigin: 'left',
                    transform: 'rotateY(-90deg)',
                }} />

                {/* Front Face */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: depth,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    transformOrigin: 'bottom',
                    transform: 'rotateX(-90deg)',
                }} />

                {/* Top Face (Lid) */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    transform: `translateZ(${depth}px)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {children}
                </div>
            </div>

            {/* Aero UI Card (Floating above) */}
            <div style={{
                position: 'absolute',
                top: -depth - 100,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 200,
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.8)',
                zIndex: 10
            }}>
                <Typography text={label} fontSize={14} fontWeight={800} color="#111" letterSpacing={1} />
                {statValue && (
                    <div style={{ marginTop: 10 }}>
                        <Typography text={statValue} fontSize={28} fontWeight={900} color={COLOR_TOKENS.primary} />
                        <Typography text={statLabel || ""} fontSize={10} fontWeight={700} color="#666" letterSpacing={1} />
                    </div>
                )}
                {/* Aluminum Trim */}
                <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: 4, 
                    background: 'linear-gradient(90deg, #ccc, #eee, #ccc)',
                    borderRadius: '16px 16px 0 0'
                }} />
            </div>

            {/* Rim Light Glow */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: width * 1.5,
                height: height * 1.5,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${COLOR_TOKENS.primary}11 0%, transparent 70%)`,
                pointerEvents: 'none'
            }} />
        </div>
    );
};
