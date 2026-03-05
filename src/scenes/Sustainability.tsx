import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { DataCard } from '../components/DataCard';
import { Frame } from '../components/Frame';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';
import { BarChart3, PieChart } from 'lucide-react';

interface SustainabilityProps {
    title?: string;
    subtitle?: string;
    mediaUrl: string;
    stats?: {
        title1: string;
        value1: string;
        unit1: string;
        title2: string;
        value2: string;
        unit2: string;
    };
}

export const Sustainability: React.FC<SustainabilityProps> = ({
    title = "Corporate Sustainability Governance",
    subtitle = "Real-time material recovery and ESG tracking.",
    mediaUrl,
    stats = {
        title1: "Corporate Score",
        value1: "8.9/10",
        unit1: "Aggregated ESG performance",
        title2: "Verified Recovery",
        value2: "730,070",
        unit2: "Kgs - Steel tracked this quarter"
    }
}) => {
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
                    title={stats.title1}
                    value={stats.value1}
                    unit={stats.unit1}
                    icon={<BarChart3 size={24} />}
                />
                <DataCard
                    delay={statsDelay + 10}
                    title={stats.title2}
                    value={stats.value2}
                    unit={stats.unit2}
                    icon={<PieChart size={24} />}
                />
            </div>
        </AbsoluteFill>
    );
};
