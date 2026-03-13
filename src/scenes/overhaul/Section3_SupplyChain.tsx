import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile, Series } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { RVSFMaterialCard } from '../../components/overhaul/RVSFMaterialCard';
import { RVSFPerformanceCard } from '../../components/overhaul/RVSFPerformanceCard';
import { RVSFScrapCard } from '../../components/overhaul/RVSFScrapCard';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { RecordingBlip } from '../../components/overhaul/RecordingBlip';

const DashboardSlide: React.FC<{
    imageUrl: string;
    activeIndex: number;
    title: string;
    highlightTop?: string;
    highlightHeight?: string;
}> = ({ imageUrl, activeIndex, title, highlightTop = '37.8%', highlightHeight = '33%' }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- MANUAL ADJUSTMENT: Recording Blips Position ---
    const BLIP_TOP = 162;
    const BLIP_RIGHT = 60;
    // --------------------------------------------------

    // MSIL highlight animation, starting shortly after slide entrance
    const focusAnim = spring({
        frame: frame - 10, // Start highlight almost immediately
        fps,
        config: ANIMATION_TOKENS.slow,
    });
    const overlayOpacity = interpolate(focusAnim, [0, 1], [0, 0.4]);

    const exitAnim = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: 'clamp' });

    const lineAnim = spring({
        frame: frame - 10,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const revealAnim = spring({
        frame: frame - 25,
        fps,
        config: ANIMATION_TOKENS.slow,
    });
    const lineHeight = interpolate(lineAnim, [0, 1], [0, 95]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background, opacity: exitAnim }}>
            <div style={{
                position: 'absolute',
                top: 60,
                left: 60,
                width: 4,
                height: lineHeight,
                backgroundColor: COLOR_TOKENS.primary,
                opacity: interpolate(lineAnim, [0, 0.1], [0, 1]),
            }} />

            <div style={{
                position: 'absolute',
                top: 60,
                left: 80,
                opacity: revealAnim,
                clipPath: `inset(0 ${100 - revealAnim * 100}% 0 0)`, // Reveal from left
                transform: `translateX(${interpolate(revealAnim, [0, 1], [-20, 0])}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                zIndex: 10,
            }}>
                <Typography text={title} fontSize={30} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                <Typography delay={15} text="Dashboard" fontSize={24} color={COLOR_TOKENS.textSecondary} fontWeight={400} textAlign="left" />
            </div>

            {/* Manual Recording Blip Adjustment (RVSF) */}
            <div style={{ 
                position: 'absolute',
                top: BLIP_TOP, 
                right: BLIP_RIGHT, 
                zIndex: 15,
            }}>
                <RecordingBlip />
            </div>

            {/* Static Toggle and Blip in the exact final position from Section 2 */}
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

                        {/* Card Overlays Area */}
                        <div style={{
                            position: 'absolute',
                            top: '38.5%', // Slightly higher to cover
                            left: '4.2%', 
                            width: '95.5%', // Wider to cover right edge
                            height: '31.5%', // Taller to cover bottom edge
                            backgroundColor: '#F5F4EB', // Corrected dashboard background
                            borderRadius: '20px',
                            zIndex: 5,
                            display: 'flex',
                            gap: '0.6%', 
                            padding: '12px 16px', // Slightly more padding for internal centering
                        }}>
                            <div style={{ flex: 1.05 }}>
                                <RVSFPerformanceCard delay={0} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <RVSFScrapCard delay={0} />
                            </div>
                            <div style={{ flex: 1.02 }}>
                                <RVSFMaterialCard delay={0} />
                            </div>
                        </div>

                        {/* Highlight Ring (Exact MSIL placement) */}
                        {frame > 5 && (
                            <div style={{
                                position: 'absolute',
                                top: highlightTop, // Positioned over the 4 cards
                                left: '4%',
                                width: '96%',
                                height: highlightHeight,
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
            <Series.Sequence durationInFrames={180}>
                <DashboardSlide
                    imageUrl="my_media/RVSF-Dashboard.png"
                    activeIndex={1}
                    title="Registered Vehicle Scrapping Facility"
                />
            </Series.Sequence>
        </Series>
    );
};
