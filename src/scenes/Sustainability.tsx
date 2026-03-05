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
                    title={stats.title1}
                    value={stats.value1}
                    unit={stats.unit1}
                    icon={<BarChart3 size={24} />}
                />
                <DataCard
                    delay={75}
                    title={stats.title2}
                    value={stats.value2}
                    unit={stats.unit2}
                    icon={<PieChart size={24} />}
                />
            </div>
        </AbsoluteFill>
    );
};
