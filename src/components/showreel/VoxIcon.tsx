import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { COLOR_TOKENS } from '../../style/tokens';

interface VoxIconProps {
    type: string;
    label: string;
    delay: number;
    x: number;
    y: number;
    rotation?: number;
}

export const VoxIcon: React.FC<VoxIconProps> = ({ type, label, delay, x, y, rotation = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entry = spring({
        frame: frame - delay,
        fps,
        config: { stiffness: 100, damping: 15 }
    });

    // Simple Icon Map for VOX style (clean SVGs)
    const renderIcon = () => {
        const props = { width: 60, height: 60, stroke: "#111", strokeWidth: 2, fill: "none" };
        switch (type) {
            case 'scrap':
                return <svg viewBox="0 0 24 24" {...props}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a3 3 0 016 0v4" /></svg>;
            case 'oem':
                return <svg viewBox="0 0 24 24" {...props}><rect x="3" y="10" width="18" height="8" rx="2" /><path d="M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M9 14h6" /></svg>;
            case 'dealer':
                return <svg viewBox="0 0 24 24" {...props}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M9 22V12h6v10" /></svg>;
            case 'recycle':
                return <svg viewBox="0 0 24 24" {...props}><path d="M7 11V7a5 5 0 0110 0v4M5 11h14v7a3 3 0 01-3 3H8a3 3 0 01-3-3v-7z" /></svg>;
            case 'production':
                return <svg viewBox="0 0 24 24" {...props}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>;
            default:
                return <div style={{ width: 60, height: 60, background: '#ccc' }} />;
        }
    };

    return (
        <div style={{
            position: 'absolute',
            left: x,
            top: y,
            transform: `translate(-50%, -50%) scale(${entry}) rotate(${rotation}deg)`,
            opacity: interpolate(frame, [delay, delay + 10], [0, 1])
        }}>
            <div style={{
                background: '#fff',
                padding: '25px',
                borderRadius: '24px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
            }}>
                {renderIcon()}
                <div style={{ 
                    fontSize: 14, 
                    fontWeight: 800, 
                    color: '#111', 
                    letterSpacing: 1,
                    textTransform: 'uppercase'
                }}>
                    {label}
                </div>
            </div>
            {/* Blueprint "Annotation" line */}
            <div style={{
                position: 'absolute',
                width: 100,
                height: 2,
                background: 'rgba(0,0,0,0.1)',
                top: '110%',
                left: '50%',
                transform: `translateX(-50%) scaleX(${entry})`,
                transformOrigin: '50% 50%'
            }} />
        </div>
    );
};
