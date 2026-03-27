import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface Point {
    x: number;
    y: number;
}

interface Path {
    id: number;
    start: Point;
    end: Point;
    delay: number;
    duration: number;
}

export const ParticleFlow: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Define some abstract paths
    const paths: Path[] = [
        { id: 1, start: { x: 200, y: 300 }, end: { x: 1700, y: 300 }, delay: 0, duration: 120 },
        { id: 2, start: { x: 200, y: 500 }, end: { x: 1700, y: 500 }, delay: 30, duration: 90 },
        { id: 3, start: { x: 200, y: 700 }, end: { x: 1700, y: 700 }, delay: 15, duration: 150 },
        { id: 4, start: { x: 400, y: 100 }, end: { x: 400, y: 900 }, delay: 45, duration: 200 },
        { id: 5, start: { x: 1500, y: 100 }, end: { x: 1500, y: 900 }, delay: 10, duration: 180 },
    ];

    return (
        <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#96CC39" stopOpacity="0" />
                    <stop offset="50%" stopColor="#96CC39" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#96CC39" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Static Background Paths */}
            {paths.map(path => (
                <line
                    key={`line-${path.id}`}
                    x1={path.start.x}
                    y1={path.start.y}
                    x2={path.end.x}
                    y2={path.end.y}
                    stroke="rgba(150, 204, 57, 0.1)"
                    strokeWidth="1"
                />
            ))}

            {/* Animated Particles */}
            {paths.map(path => {
                const progress = ((frame - path.delay) % path.duration) / path.duration;
                if (frame < path.delay) return null;

                const x = interpolate(progress, [0, 1], [path.start.x, path.end.x]);
                const y = interpolate(progress, [0, 1], [path.start.y, path.end.y]);

                return (
                    <g key={`particle-${path.id}`} filter="url(#glow)">
                        <circle
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#96CC39"
                        />
                        <circle
                            cx={x}
                            cy={y}
                            r="12"
                            fill="#96CC39"
                            fillOpacity={interpolate(Math.sin(frame / 5), [-1, 1], [0.1, 0.3])}
                        />
                    </g>
                );
            })}
        </svg>
    );
};
