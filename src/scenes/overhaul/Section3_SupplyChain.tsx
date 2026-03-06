import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile, Series } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

const DashboardSlide: React.FC<{ imageUrl: string; activeIndex: number; title: string }> = ({ imageUrl, activeIndex, title }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // MSIL highlight animation, starting shortly after slide entrance
    const focusAnim = spring({
        frame: frame - 15,
        fps,
        config: ANIMATION_TOKENS.slow,
    });
    const overlayOpacity = interpolate(focusAnim, [0, 1], [0, 0.4]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background }}>
            <div style={{
                position: 'absolute',
                top: 60,
                left: 60,
                width: 4,
                height: 95,
                backgroundColor: COLOR_TOKENS.primary,
            }} />

            <div style={{
                position: 'absolute',
                top: 60,
                left: 80,
            }}>
                <Typography text={title} fontSize={30} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                <Typography text="Dashboard" fontSize={24} color={COLOR_TOKENS.textSecondary} fontWeight={400} textAlign="left" />
            </div>

            {/* Static Toggle in the exact final position from Section 2 */}
            <div style={{
                position: 'absolute',
                top: 60,
                right: 60,
                zIndex: 10,
            }}>
                <Toggle mode="corporate" />
            </div>

            <AbsoluteFill style={{
                padding: '160px 60px 60px 60px',
            }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <ToasterTabs activeIndex={activeIndex} />
                    <div style={{
                        flex: 1,
                        background: 'white',
                        borderRadius: '0 24px 24px 24px',
                        border: `1px solid ${COLOR_TOKENS.border}`,
                        boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <Img src={staticFile(imageUrl)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />

                        {/* Highlight Ring (Exact MSIL placement) */}
                        {frame > 15 && (
                            <div style={{
                                position: 'absolute',
                                top: '45.8%', // Positioned over the 4 cards
                                left: '4.6%',
                                width: '95.4%',
                                height: '19%',
                                border: `6px solid ${COLOR_TOKENS.primary}`,
                                borderRadius: 25, // Slightly softer corners to match cards
                                boxShadow: `0 0 0 1000px rgba(0,0,0,${overlayOpacity * 1.5})`, // Darkening outside only
                                transform: `scale(${focusAnim})`, // Pop-in scaling animation
                                opacity: focusAnim,
                            }} />
                        )}
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

export const Section3_SupplyChain: React.FC = () => {
    return (
        <Series>
            <Series.Sequence durationInFrames={450}>
                <DashboardSlide imageUrl="media/RVSF-Dashboard.png" activeIndex={1} title="Registered Vehicle Scrapping Facility" />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <DashboardSlide imageUrl="media/Recycler-Dashboard.png" activeIndex={2} title="Recycler" />
            </Series.Sequence>
            <Series.Sequence durationInFrames={450}>
                <DashboardSlide imageUrl="media/Supplier-Dashboard.png" activeIndex={3} title="Supplier" />
            </Series.Sequence>
        </Series>
    );
};
