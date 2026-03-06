import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { Car, ShieldCheck, AlertTriangle, Calendar } from 'lucide-react';

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

    const startX = width - 656; // Exact right margin as previous sections
    const startY = 60; // Exact top margin as previous sections
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

    let headerTitle = "Regulatory Compliance";
    if (frame >= dashboard1Delay && frame < dashboard2Delay) {
        headerTitle = "Regulatory landscape";
    } else if (frame >= dashboard2Delay) {
        headerTitle = "Vehicle Wise CBAM compliance";
    }

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
                padding: '200px 60px 60px 60px', // Uniform padding, offset by 60px to account for removed ToasterTabs
                opacity: contentFade, // Fade in the actual dashboard after toggle returns
            }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    top: 60,
                    left: 60,
                    width: 4,
                    height: 95,
                    backgroundColor: COLOR_TOKENS.primary,
                }} />

                {/* Header Content */}
                <div style={{
                    position: 'absolute',
                    top: 60,
                    left: 80,
                }}>
                    <Typography text={headerTitle} fontSize={30} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                    <Typography text="Dashboard Overview (OEM)" fontSize={24} color={COLOR_TOKENS.textSecondary} fontWeight={400} textAlign="left" />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>

                    {/* Dashboards showing sequentially (FULL BLEED, NO BORDER RADIUS) */}
                    {frame >= dashboard1Delay && (
                        <div style={{
                            flex: 1,
                            background: 'white',
                            border: `1px solid ${COLOR_TOKENS.border}`,
                            boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            position: 'relative',
                        }}>
                            {frame >= dashboard1Delay && frame < dashboard2Delay && (
                                <Img
                                    src={staticFile('media/Regulatory-Landscape.png')}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                                />
                            )}
                            {frame >= dashboard2Delay && (
                                <Img
                                    src={staticFile('media/VW-CBAM.png')}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                                />
                            )}
                        </div>
                    )}

                    {/* Reveal the 4 tiles (ROUNDED BORDERS) */}
                    {frame < dashboard1Delay && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gridTemplateRows: '1fr 1fr',
                            gap: 24,
                            height: '100%',
                            padding: '0 0 40px 0',
                        }}>
                            {/* TILE 1: Total Active Models */}
                            <div style={{
                                background: 'white',
                                borderRadius: 24,
                                padding: '32px 40px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                opacity: spring({ frame: frame - tilesDelay, fps }),
                                transform: `translateY(${interpolate(spring({ frame: frame - tilesDelay, fps }), [0, 1], [20, 0])}px)`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: COLOR_TOKENS.textSecondary,
                                        letterSpacing: 1,
                                    }}>TOTAL ACTIVE MODELS</div>
                                    <div style={{ background: '#EEF2FF', padding: 12, borderRadius: '50%' }}>
                                        <Car size={24} color="#3B82F6" />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 48, fontWeight: 700, color: '#3B82F6', lineHeight: 1 }}>12</div>
                                    <div style={{ fontSize: 14, color: COLOR_TOKENS.textSecondary, marginTop: 8 }}>Across all segments</div>
                                </div>
                            </div>

                            {/* TILE 2: Fully Compliant */}
                            <div style={{
                                background: 'white',
                                borderRadius: 24,
                                padding: '32px 40px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                opacity: spring({ frame: frame - tilesDelay - 5, fps }),
                                transform: `translateY(${interpolate(spring({ frame: frame - tilesDelay - 5, fps }), [0, 1], [20, 0])}px)`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: COLOR_TOKENS.textSecondary,
                                        letterSpacing: 1,
                                    }}>FULLY COMPLIANT</div>
                                    <div style={{ background: '#ECFDF5', padding: 12, borderRadius: '50%' }}>
                                        <ShieldCheck size={24} color="#10B981" />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 48, fontWeight: 700, color: '#10B981', lineHeight: 1 }}>85%</div>
                                    <div style={{ fontSize: 14, color: COLOR_TOKENS.textSecondary, marginTop: 8 }}>10 Models</div>
                                </div>
                            </div>

                            {/* TILE 3: At Risk / Non-Compliant */}
                            <div style={{
                                background: 'white',
                                borderRadius: 24,
                                padding: '32px 40px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                opacity: spring({ frame: frame - tilesDelay - 10, fps }),
                                transform: `translateY(${interpolate(spring({ frame: frame - tilesDelay - 10, fps }), [0, 1], [20, 0])}px)`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: COLOR_TOKENS.textSecondary,
                                        letterSpacing: 1,
                                    }}>AT RISK / NON-COMPLIANT</div>
                                    <div style={{ background: '#FFFBEB', padding: 12, borderRadius: '50%' }}>
                                        <AlertTriangle size={24} color="#F59E0B" />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 48, fontWeight: 700, color: '#F59E0B', lineHeight: 1 }}>2</div>
                                    <div style={{ fontSize: 14, color: COLOR_TOKENS.textSecondary, marginTop: 8 }}>Requires Attention</div>
                                </div>
                            </div>

                            {/* TILE 4: Upcoming Deadline */}
                            <div style={{
                                background: 'white',
                                borderRadius: 24,
                                padding: '32px 40px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                opacity: spring({ frame: frame - tilesDelay - 15, fps }),
                                transform: `translateY(${interpolate(spring({ frame: frame - tilesDelay - 15, fps }), [0, 1], [20, 0])}px)`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: COLOR_TOKENS.textSecondary,
                                        letterSpacing: 1,
                                    }}>UPCOMING DEADLINE</div>
                                    <div style={{ background: '#EEF2FF', padding: 12, borderRadius: '50%' }}>
                                        <Calendar size={24} color="#3B82F6" />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 48, fontWeight: 700, color: '#3B82F6', lineHeight: 1 }}>15 Days</div>
                                    <div style={{ fontSize: 14, color: COLOR_TOKENS.textSecondary, marginTop: 8 }}>RVSF Audit Due</div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                {/* Bottom Narration Text */}
                {/* <div style={{ marginTop: 40 }}>
                    <Typography
                        delay={30}
                        text="Worry no more about Compliance complexity, as MatNEXT keeps you updated on the latest regulations, and measures your progress."
                        fontSize={22}
                        color={COLOR_TOKENS.text}
                        fontWeight={500}
                        textAlign="center"
                    />
                </div> */}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
