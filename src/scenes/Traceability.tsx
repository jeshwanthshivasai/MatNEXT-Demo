import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { DataCard } from '../components/DataCard';
import { Frame } from '../components/Frame';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';
import { MapPin, Boxes, ReceiptText } from 'lucide-react';

export const Traceability: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleDelay = 0;
    const frameDelay = 30;
    const statsDelay = 60;

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
                    text="End-to-End Traceability"
                    fontSize={56}
                    textAlign="center"
                />
                <Typography
                    delay={titleDelay + 10}
                    text="From ELV to Car. Every material tracked."
                    fontSize={24}
                    color={COLOR_TOKENS.textSecondary}
                    fontWeight={500}
                    textAlign="center"
                />
            </div>

            {/* Real Video Frame */}
            <Frame
                delay={frameDelay}
                mediaUrl="Traceability View Video.mp4"
                mediaType="video"
            />

            {/* Stats row */}
            <div style={{
                display: 'flex',
                gap: 32,
                width: '100%',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <DataCard
                    delay={statsDelay}
                    title="Batch Accuracy"
                    value="99.8%"
                    icon={<Boxes size={24} />}
                />
                <DataCard
                    delay={statsDelay + 10}
                    title="Verified Invoices"
                    value="12,540+"
                    unit="Audited documents this quarter"
                    icon={<ReceiptText size={24} />}
                />
            </div>
        </AbsoluteFill>
    );
};
