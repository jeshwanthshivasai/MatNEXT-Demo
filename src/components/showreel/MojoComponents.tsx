import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig, Easing } from 'remotion';
import { LucideIcon } from 'lucide-react';

// 1. StageNode: Glassmorphic card with icon
interface StageNodeProps {
    Icon: LucideIcon;
    label: string;
    delay: number;
    x: number;
    y: number;
}

export const StageNode: React.FC<StageNodeProps> = ({ Icon, label, delay, x, y }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entry = spring({
        frame: frame - delay,
        fps,
        config: { stiffness: 100, damping: 20 },
    });

    return (
        <div 
            className="absolute flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
            style={{
                left: x,
                top: y,
                transform: `translate(-50%, -50%) scale(${entry})`,
                opacity: interpolate(frame, [delay, delay + 10], [0, 1]),
            }}
        >
            <Icon size={48} className="text-[#4CAF50]" />
            <span className="text-sm font-black text-[#1A1A1A] tracking-tighter uppercase">{label}</span>
        </div>
    );
};

// 2. DataCounter: Rapidly rolling counters
interface DataCounterProps {
    value: number;
    label: string;
    delay: number;
    x: number;
    y: number;
}

export const DataCounter: React.FC<DataCounterProps> = ({ value, label, delay, x, y }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const count = Math.floor(interpolate(frame, [delay, delay + 60], [0, value], { 
        extrapolateLeft: 'clamp', 
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.33, 1, 0.68, 1)
    }));

    return (
        <div 
            className="absolute flex flex-col items-start"
            style={{ left: x, top: y, opacity: interpolate(frame, [delay, delay + 10], [0, 1]) }}
        >
            <span className="text-6xl font-black text-[#1A1A1A] tabular-nums italic">
                {count.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-[#4CAF50] ml-1 tracking-[0.2em]">{label}</span>
        </div>
    );
};

// 3. Highlighter: Marker pen stroke effect
interface HighlighterProps {
    text: string;
    delay: number;
    className?: string;
}

export const Highlighter: React.FC<HighlighterProps> = ({ text, delay, className }) => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame, [delay, delay + 25], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.33, 1, 0.68, 1)
    });

    return (
        <span className={`relative inline-block ${className || ""}`}>
            <span 
                className="absolute left-0 bottom-1 h-3/4 bg-[#FAED27] -z-10"
                style={{ width: `${progress * 100}%` }}
            />
            {text}
        </span>
    );
};

// 4. CO2Tag: Floating badge with bobbing animation
interface CO2TagProps {
    val: string;
    delay: number;
    x: number;
    y: number;
}

export const CO2Tag: React.FC<CO2TagProps> = ({ val, delay, x, y }) => {
    const frame = useCurrentFrame();
    const bob = Math.sin(frame / 10) * 10;

    return (
        <div 
            className="absolute flex items-center gap-2 bg-[#4CAF50] text-white px-3 py-1 rounded-full shadow-lg"
            style={{ 
                left: x, 
                top: y + bob, 
                opacity: interpolate(frame, [delay, delay + 10], [0, 1]),
                transform: 'translate(-50%, -50%)'
            }}
        >
            <span className="text-[10px] font-black tracking-widest leading-none">▲ {val}</span>
        </div>
    );
};
