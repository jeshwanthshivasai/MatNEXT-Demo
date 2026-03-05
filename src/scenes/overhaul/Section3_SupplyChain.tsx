import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile, Series } from 'remotion';
import { Typography } from '../../components/Typography';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

const DashboardSlide: React.FC<{ imageUrl: string; activeIndex: number }> = ({ imageUrl, activeIndex }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background, padding: 60 }}>
            {/* Header placeholder (Static for this section) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Typography text="Automotive Value Chain Tracking" fontSize={32} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <ToasterTabs activeIndex={activeIndex} />
                <div style={{
                    flex: 1,
                    background: 'white',
                    borderRadius: '0 24px 24px 24px',
                    border: `1px solid ${COLOR_TOKENS.border}`,
                    boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                }}>
                    <Img src={staticFile(imageUrl)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
            </div>

            {/* Margin for text which will be overlaid at the Composition level */}
            <div style={{ height: 100 }} />
        </AbsoluteFill>
    );
};

export const Section3_SupplyChain: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={75}>
                <DashboardSlide imageUrl="media/RVSF-Dashboard.png" activeIndex={1} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={75}>
                <DashboardSlide imageUrl="media/Recycler-Dashboard.png" activeIndex={2} />
            </Series.Sequence>
            <Series.Sequence durationInFrames={75}>
                <DashboardSlide imageUrl="media/Supplier-Dashboard.png" activeIndex={3} />
            </Series.Sequence>
        </Series>
    );
};
