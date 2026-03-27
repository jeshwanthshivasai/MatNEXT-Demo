import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLOR_TOKENS } from '../../style/tokens';

interface DataPipeProps {
    points: { x: number; y: number }[];
    color?: string;
}

export const DataPipe: React.FC<DataPipeProps> = ({ points, color = "#4CAF50" }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Create path string from isometric points
    // We'll use a simple "snaking" Bezier or Polyline
    const pathData = points.reduce((acc, p, i) => {
        return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "");

    const dashOffset = interpolate(frame, [0, 30], [100, 0], { extrapolateRight: 'extend' });

    return (
        <svg
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 10px rgba(76, 175, 80, 0.4))'
            }}
        >
            <defs>
                <linearGradient id="pipe-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                    <stop offset="50%" stopColor={color} stopOpacity="1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.8" />
                </linearGradient>
            </defs>

            {/* Background Pipe (Outer Case) */}
            <path
                d={pathData}
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Glowing Core */}
            <path
                d={pathData}
                fill="none"
                stroke="url(#pipe-glow)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="20 40"
                style={{
                    strokeDashoffset: frame * -2 // Animated flow
                }}
            />
        </svg>
    );
};
