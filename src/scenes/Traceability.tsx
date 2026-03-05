import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { DataCard } from '../components/DataCard';
import { Frame } from '../components/Frame';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';
import { Boxes, ReceiptText } from 'lucide-react';

export const Traceability: React.FC = () => {
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
                    text="End-to-End Traceability"
                    fontSize={72}
                    textAlign="center"
                    letterSpacing={-3}
                />
                <Typography
                    delay={15}
                    text="From Part Production to Recycling. Every material tracked."
                    fontSize={24}
                    color={COLOR_TOKENS.textSecondary}
                    fontWeight={500}
                    textAlign="center"
                    letterSpacing={-0.5}
                />
            </div>

            {/* Premium Video Frame */}
            <Frame
                delay={30}
                mediaUrl="Traceability View Video.mp4"
                mediaType="video"
            />

            {/* Stats row - Staggered */}
            <div style={{
                display: 'flex',
                gap: 32,
                width: '100%',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <DataCard
                    delay={60}
                    title="Batch Accuracy"
                    value="99.8%"
                    icon={<Boxes size={24} />}
                />
                <DataCard
                    delay={75}
                    title="Verified Invoices"
                    value="12,540+"
                    unit="Audited documents this quarter"
                    icon={<ReceiptText size={24} />}
                />
            </div>
        </AbsoluteFill>
    );
};
