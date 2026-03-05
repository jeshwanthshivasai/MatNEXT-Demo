import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate, interpolateColors } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { LayoutGrid, ShieldCheck } from 'lucide-react';

interface SegmentedToggleProps {
    mode: 'corporate' | 'regulatory';
    delay?: number;
}

export const Toggle: React.FC<SegmentedToggleProps> = ({ mode, delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const activeIndex = mode === 'corporate' ? 0 : 1;
    const progress = interpolate(anim, [0, 1], [1 - activeIndex, activeIndex]);

    // Dimensions: 16px Padding
    // Outer Width: 560px, Padding: 16px
    // Inner Width: 528px
    // Slider Width: 260px
    // Slider Step: 268px
    const sliderX = interpolate(progress, [0, 1], [16, 284]);

    return (
        <div style={{
            width: 560,
            height: 92,
            backgroundColor: '#F8FAFC',
            borderRadius: 46,
            padding: 16,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #E2E8F0',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Inter, sans-serif',
        }}>
            {/* Active Slider Indicator */}
            <div style={{
                position: 'absolute',
                left: sliderX,
                width: 260,
                height: 60,
                backgroundColor: COLOR_TOKENS.primary,
                borderRadius: 30,
                boxShadow: '0 10px 25px rgba(150, 204, 57, 0.4)',
                zIndex: 1,
            }} />

            {/* Corporate Option */}
            <div style={{
                flex: 1,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                color: progress < 0.5 ? 'white' : '#64748B',
                transition: 'color 0.3s ease',
            }}>
                <LayoutGrid size={24} />
                <span style={{ fontWeight: 700, fontSize: 18 }}>Corporate Overview</span>
            </div>

            {/* Regulatory Option */}
            <div style={{
                flex: 1,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                color: progress > 0.5 ? 'white' : '#64748B',
                transition: 'color 0.3s ease',
            }}>
                <ShieldCheck size={24} />
                <span style={{ fontWeight: 700, fontSize: 18 }}>Regulatory Compliance</span>
            </div>
        </div>
    );
};
