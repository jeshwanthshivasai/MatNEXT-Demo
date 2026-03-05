import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { Frame } from '../components/Frame';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';
import { ShieldCheck } from 'lucide-react';

interface ComplianceProps {
    title?: string;
    subtitle?: string;
    mediaUrl: string;
}

export const Compliance: React.FC<ComplianceProps> = ({
    title = "Global Regulatory Command Center",
    subtitle = "MSIL Readiness for India & Global Frameworks.",
    mediaUrl
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleDelay = 0;
    const frameDelay = 30;

    return (
        <AbsoluteFill style={{
            backgroundColor: COLOR_TOKENS.background,
            padding: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
            alignItems: 'center',
        }}>
            {/* Scene Title */}
            <div style={{ width: '100%', marginBottom: 20 }}>
                <Typography
                    delay={titleDelay}
                    text={title}
                    fontSize={56}
                    textAlign="center"
                />
                <Typography
                    delay={titleDelay + 10}
                    text={subtitle}
                    fontSize={24}
                    color={COLOR_TOKENS.textSecondary}
                    fontWeight={500}
                    textAlign="center"
                />
            </div>

            {/* Real Dashboard Frame */}
            <Frame
                delay={frameDelay}
                mediaUrl={mediaUrl}
                mediaType="image"
            />

            {/* Bottom Banner */}
            <div style={{
                background: '#ECFDF5',
                padding: '12px 20px',
                borderRadius: 12,
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginTop: 20,
                opacity: spring({ frame: frame - 60, fps, config: ANIMATION_TOKENS.spring }),
                transform: `translateY(${interpolate(spring({ frame: frame - 60, fps, config: ANIMATION_TOKENS.spring }), [0, 1], [20, 0])}px)`
            }}>
                <ShieldCheck size={20} color="#10B981" />
                <div style={{ fontSize: 14, color: '#065F46', fontWeight: 500 }}>
                    Automatic data synchronization with CPCB (Central Pollution Control Board) portal.
                </div>
            </div>
        </AbsoluteFill>
    );
};
