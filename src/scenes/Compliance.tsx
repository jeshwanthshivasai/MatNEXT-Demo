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

    return (
        <AbsoluteFill style={{
            backgroundColor: COLOR_TOKENS.background,
            padding: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* Scene Title Section - Staggered */}
            <div style={{ width: '100%', marginBottom: 20 }}>
                <Typography
                    delay={0}
                    text={title}
                    fontSize={72}
                    textAlign="center"
                    letterSpacing={-3}
                />
                <Typography
                    delay={15}
                    text={subtitle}
                    fontSize={24}
                    color={COLOR_TOKENS.textSecondary}
                    fontWeight={500}
                    textAlign="center"
                    letterSpacing={-0.5}
                />
            </div>

            {/* Premium Dashboard Frame */}
            <Frame
                delay={30}
                mediaUrl={mediaUrl}
                mediaType="image"
            />

            {/* Bottom Banner - Staggered */}
            <div style={{
                background: '#ECFDF5',
                padding: '16px 32px',
                borderRadius: 16,
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                marginTop: 20,
                opacity: spring({ frame: frame - 60, fps, config: ANIMATION_TOKENS.premium }),
                transform: `translateY(${interpolate(spring({ frame: frame - 60, fps, config: ANIMATION_TOKENS.premium }), [0, 1], [30, 0])}px)`
            }}>
                <ShieldCheck size={24} color="#10B981" />
                <div style={{ fontSize: 16, color: '#065F46', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                    Automatic data synchronization with CPCB portal.
                </div>
            </div>
        </AbsoluteFill>
    );
};
