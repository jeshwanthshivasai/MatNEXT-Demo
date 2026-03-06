import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

export const Section4_Compliance: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Mode Toggle Animation at starts
    const toggleStart = 0;
    const mode = 'regulatory'; // Hardcoded for this scene so no transition occurs

    // 4 Tiles reveal
    const tilesDelay = 60;
    const dashboard1Delay = 120; // Regulatory Landscape
    const dashboard2Delay = 210; // VW CBAM

    return (
        <AbsoluteFill style={{
            backgroundColor: COLOR_TOKENS.background,
            padding: 60,
        }}>
            {/* Header Area */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 40,
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Typography
                        text="Regulatory Compliance Mode"
                        fontSize={32}
                        fontWeight={600}
                        color={COLOR_TOKENS.text}
                        textAlign="left"
                    />
                </div>

                {/* Animated Toggle - Static on Regulatory */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Toggle mode={mode} delay={toggleStart} />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <ToasterTabs activeIndex={4} />

                <div style={{
                    flex: 1,
                    background: 'white',
                    borderRadius: '0 24px 24px 24px',
                    border: `1px solid ${COLOR_TOKENS.border}`,
                    boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    {/* Dashboards showing sequentially */}
                    {frame >= dashboard1Delay && frame < dashboard2Delay && (
                        <Img
                            src={staticFile('media/Regulatory-Landscape.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    )}
                    {frame >= dashboard2Delay && (
                        <Img
                            src={staticFile('media/VW-CBAM.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    )}

                    {/* Reveal the tiles logic or 4-tile view if needed */}
                    {frame < dashboard1Delay && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gridTemplateRows: '1fr 1fr',
                            gap: 20,
                            padding: 40,
                            height: '100%'
                        }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{
                                    background: '#F1F5F9',
                                    borderRadius: 16,
                                    opacity: spring({ frame: frame - tilesDelay - (i * 5), fps }),
                                    transform: `translateY(${interpolate(spring({ frame: frame - tilesDelay - (i * 5), fps }), [0, 1], [20, 0])}px)`
                                }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Narration Text */}
            <div style={{ marginTop: 40 }}>
                <Typography
                    delay={30}
                    text="Worry no more about Compliance complexity, as MatNEXT keeps you updated on the latest regulations, and measures your progress."
                    fontSize={22}
                    color={COLOR_TOKENS.text}
                    fontWeight={500}
                    textAlign="center"
                />
            </div>
        </AbsoluteFill>
    );
};
