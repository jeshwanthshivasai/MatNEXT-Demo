import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate, interpolateColors } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { LayoutGrid, ShieldCheck } from 'lucide-react';

interface SegmentedToggleProps {
    mode: 'corporate' | 'regulatory';
    delay?: number;
    animateTransition?: boolean;
}

export const Toggle: React.FC<SegmentedToggleProps> = ({ mode, delay = 0, animateTransition = false }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const activeIndex = mode === 'corporate' ? 0 : 1;

    // Determine start progress based on whether we are animating the transition
    const startProgress = animateTransition
        ? (mode === 'corporate' ? 1 : 0)
        : (mode === 'corporate' ? 0 : 1);

    const progress = interpolate(anim, [0, 1], [startProgress, activeIndex], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Dimensions calculated for perfect symmetry (target padding ~26px around text on all sides)
    const outerWidth = 596;
    const padding = 8;
    const sliderWidthCorporate = 272;
    const sliderWidthRegulatory = 308; // Wider to accommodate the longer text

    // X positions to seamlessly hug the edges
    const sliderXCorporate = padding; // Left edge
    const sliderXRegulatory = padding + sliderWidthCorporate; // Slides perfectly to the right

    const sliderX = interpolate(progress, [0, 1], [sliderXCorporate, sliderXRegulatory]);
    const sliderWidth = interpolate(progress, [0, 1], [sliderWidthCorporate, sliderWidthRegulatory]);

    return (
        <div style={{
            width: outerWidth,
            height: 92,
            backgroundColor: '#F8FAFC',
            borderRadius: 16,
            padding: 8, // Tightened padding to hug the slider deeply
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
                width: sliderWidth, // Exactly half
                height: 76, // Height = Outer Height (92) - Top/Bot Padding (16)
                backgroundColor: COLOR_TOKENS.primary,
                borderRadius: 10,
                boxShadow: '0 10px 25px rgba(150, 204, 57, 0.4)',
                zIndex: 1,
            }} />

            {/* Corporate Option */}
            <div style={{
                width: sliderWidthCorporate,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16, // Optimal balance
                color: progress < 0.5 ? 'white' : '#64748B',
                transition: 'color 0.3s ease',
            }}>
                <LayoutGrid size={24} />
                <span style={{ fontWeight: 700, fontSize: 18 }}>Corporate Overview</span>
            </div>

            {/* Regulatory Option */}
            <div style={{
                width: sliderWidthRegulatory,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16, // Optimal balance
                color: progress > 0.5 ? 'white' : '#64748B',
                transition: 'color 0.3s ease',
            }}>
                <ShieldCheck size={24} />
                <span style={{ fontWeight: 700, fontSize: 18 }}>Regulatory Compliance</span>
            </div>
        </div>
    );
};
