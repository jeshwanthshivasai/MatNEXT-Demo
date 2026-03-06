import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

interface ToasterTabProps {
    label: string;
    active?: boolean;
    delay?: number;
}

const ToasterTab: React.FC<ToasterTabProps> = ({ label, active, delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    // Toaster rising effect: from bottom to position
    const translateY = interpolate(anim, [0, 1], [40, 0]);
    const opacity = interpolate(anim, [0, 1], [0, 1]);

    return (
        <div style={{
            padding: '12px 24px',
            backgroundColor: active ? COLOR_TOKENS.primary : 'white',
            color: active ? 'white' : COLOR_TOKENS.textSecondary,
            borderRadius: '12px 12px 0 0',
            fontWeight: 600,
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            border: `1px solid ${COLOR_TOKENS.border}`,
            borderBottom: 'none',
            transform: `translateY(${translateY}px)`,
            opacity,
            boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
            marginRight: 4,
            cursor: 'pointer',
        }}>
            {label}
        </div>
    );
};

export const ToasterTabs: React.FC<{ activeIndex?: number; delay?: number }> = ({ activeIndex = 0, delay = 0 }) => {
    const tabs = ['MSIL', 'RVSF', 'Recycler', 'Supplier'];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            paddingLeft: 40,
            height: 60,
            overflow: 'hidden',
        }}>
            {tabs.map((tab, i) => (
                <ToasterTab
                    key={tab}
                    label={tab}
                    active={i === activeIndex}
                    delay={delay + (i * 5)}
                />
            ))}
        </div>
    );
};
