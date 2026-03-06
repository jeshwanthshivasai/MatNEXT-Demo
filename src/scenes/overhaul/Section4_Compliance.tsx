import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

export const Section4_Compliance: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // 1. Toggle Center Animation (Starts after crossfade)
    const MOVE_TO_CENTER_START = 30; // wait for crossfade to finish completely
    const moveToCenter = spring({
        frame: frame - MOVE_TO_CENTER_START,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const TOGGLE_SWITCH_START = 65;

    // Move from center to top-right corner
    // Top Margin: 60px
    // Right Margin: 60px 
    // Therefore X = width - ToggleWidth(596) - 60 = width - 656
    const MOVE_BACK_START = 110;
    const moveBack = spring({
        frame: frame - MOVE_BACK_START,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const startX = width - 656;
    const startY = 60;
    const centerX = width / 2 - 298;
    const centerY = height / 2 - 46;

    const toggleX = interpolate(moveToCenter, [0, 1], [startX, centerX]) + interpolate(moveBack, [0, 1], [0, startX - centerX]);
    const toggleY = interpolate(moveToCenter, [0, 1], [startY, centerY]) + interpolate(moveBack, [0, 1], [0, startY - centerY]);

    // 2. Dashboards Reveal (150 frames added to delays)
    const REVEAL_START = 150;
    const tilesDelay = REVEAL_START + 60; // 210
    const dashboard1Delay = REVEAL_START + 120; // 270
    const dashboard2Delay = REVEAL_START + 210; // 360

    // Header fade in
    const contentFade = spring({
        frame: frame - REVEAL_START,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background }}>

            {/* Animated Toggle (Centered then moves) */}
            <div style={{
                position: 'absolute',
                top: toggleY,
                left: toggleX,
                zIndex: 10,
            }}>
                <Toggle mode="regulatory" delay={TOGGLE_SWITCH_START} animateTransition={true} />
            </div>

            {/* Main Content (fades in) */}
            <AbsoluteFill style={{
                padding: 60,
                opacity: contentFade, // Fade in the actual dashboard after toggle returns
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
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <ToasterTabs activeIndex={4} />

                    <div style={{
                        flex: 1,
                        background: 'white',
                        borderRadius: '24px',
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
        </AbsoluteFill>
    );
};
