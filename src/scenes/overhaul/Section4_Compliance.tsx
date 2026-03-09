import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { Car, ShieldCheck, AlertTriangle, Calendar } from 'lucide-react';

export const Section4_Compliance: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // 1. Toggle Animation Logic
    const MOVE_TO_CENTER_START = 30;
    const moveToCenter = spring({ frame: frame - MOVE_TO_CENTER_START, fps, config: ANIMATION_TOKENS.slow });

    const TOGGLE_SWITCH_START = 65;

    const MOVE_BACK_START = 110;
    const moveBack = spring({ frame: frame - MOVE_BACK_START, fps, config: ANIMATION_TOKENS.slow });

    const startX = width - 656;
    const startY = 60;
    const centerX = width / 2 - 298;
    const centerY = height / 2 - 46;

    const toggleX = interpolate(moveToCenter, [0, 1], [startX, centerX]) + interpolate(moveBack, [0, 1], [0, startX - centerX]);
    const toggleY = interpolate(moveToCenter, [0, 1], [startY, centerY]) + interpolate(moveBack, [0, 1], [0, startY - centerY]);

    // 2. Main Timings (2s clean, 3s highlight = 150 frames per board)
    const REVEAL_START = 150;

    // Overview Tiles (shown briefly during toggle return)
    const tilesDelay = 130;

    // Dashboard 1: Regulatory Landscape
    const board1Start = 180;
    const board1Highlight = board1Start + 60;
    const board1End = board1Start + 150;

    // Dashboard 2: Vehicle Wise CBAM
    const board2Start = board1End;
    const board2Highlight = board2Start + 60;
    const board2End = board2Start + 150;

    // Exit Animation
    const exitAnim = interpolate(frame, [board2End, board2End + 30], [1, 0], { extrapolateRight: 'clamp' });

    // Header Content Reveal
    let headerTitle = "Regulatory Compliance";
    let headerSub = "Dashboard Overview (OEM)";
    let textRevealStart = REVEAL_START;

    if (frame >= board2Start) {
        headerTitle = "Vehicle Wise CBAM Compliance";
        headerSub = "Dashboard";
        textRevealStart = board2Start;
    } else if (frame >= board1Start) {
        headerTitle = "Regulatory Landscape";
        headerSub = "Dashboard";
        textRevealStart = board1Start;
    }

    const lineAnim = spring({ frame: frame - textRevealStart, fps, config: ANIMATION_TOKENS.slow });
    const lineHeight = interpolate(lineAnim, [0, 1], [0, 95]);
    const revealAnim = spring({ frame: frame - (textRevealStart + 10), fps, config: ANIMATION_TOKENS.slow });

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background, opacity: exitAnim }}>

            {/* Header / Brand UI */}
            <div style={{ position: 'absolute', top: 60, left: 60, width: 4, height: lineHeight, backgroundColor: COLOR_TOKENS.primary, opacity: interpolate(lineAnim, [0, 0.1], [0, 1]) }} />
            <div style={{ position: 'absolute', top: 60, left: 80, opacity: revealAnim, transform: `translateX(${interpolate(revealAnim, [0, 1], [-20, 0])}px)` }}>
                <Typography text={headerTitle} fontSize={30} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                <Typography delay={15} text={headerSub} fontSize={24} color={COLOR_TOKENS.textSecondary} fontWeight={400} textAlign="left" />
            </div>

            {/* Toggle */}
            <div style={{ position: 'absolute', top: toggleY, left: toggleX, zIndex: 10 }}>
                <Toggle mode="regulatory" delay={TOGGLE_SWITCH_START} animateTransition={true} />
            </div>

            {/* Main Content Area (Matches Section 2 Y-position: 160px + 60px ToasterTabs = 220px) */}
            <AbsoluteFill style={{ padding: '220px 60px 60px 60px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>

                    {/* Tiles (Only visible at start) */}
                    {frame < board1Start && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 60, height: '100%', opacity: interpolate(frame, [board1Start - 20, board1Start], [1, 0], { extrapolateRight: 'clamp' }) }}>
                            {[
                                { title: "TOTAL ACTIVE MODELS", value: "12", sub: "Across all segments", icon: <Car size={32} color="#3B82F6" />, bg: "#EEF2FF" },
                                { title: "FULLY COMPLIANT", value: "85%", sub: "10 Models", icon: <ShieldCheck size={32} color="#10B981" />, bg: "#ECFDF5" },
                                { title: "AT RISK / NON-COMPLIANT", value: "2", sub: "Requires Attention", icon: <AlertTriangle size={32} color="#F59E0B" />, bg: "#FFFBEB" },
                                { title: "UPCOMING DEADLINE", value: "15 Days", sub: "RVSF Audit Due", icon: <Calendar size={32} color="#3B82F6" />, bg: "#EEF2FF" }
                            ].map((tile, i) => (
                                <div key={i} style={{ background: 'white', borderRadius: 24, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', opacity: spring({ frame: frame - tilesDelay - (i * 5), fps }), transform: `translateY(${interpolate(spring({ frame: frame - tilesDelay - (i * 5), fps }), [0, 1], [20, 0])}px)` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: 32, fontWeight: 600, color: COLOR_TOKENS.textSecondary }}>{tile.title}</div>
                                        <div style={{ background: tile.bg, padding: 12, borderRadius: '25%' }}>{tile.icon}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 64, fontWeight: 700, color: '#96CC39' }}>{tile.value}</div>
                                        <div style={{ fontSize: 24, color: COLOR_TOKENS.textSecondary }}>{tile.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </AbsoluteFill>

            {/* Dashboard 1 — positioned independently, extends to bottom edge */}
            <div style={{ position: 'absolute', top: 200, left: 60, right: 60, bottom: -1, opacity: interpolate(frame, [board1Start, board1Start + 20, board1End, board1End + 20], [0, 1, 1, 0], { extrapolateRight: 'clamp' }), display: frame >= board1Start && frame < board1End + 30 ? 'block' : 'none' }}>
                <div style={{ width: '100%', height: '100%', background: 'white', border: `1px solid ${COLOR_TOKENS.border}`, borderRadius: '0px 24px 0px 0px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 80px rgba(0,0,0,0.08)' }}>
                    <Img src={staticFile('media/Regulatory-Landscape.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    {frame > board1Highlight && (
                        <div style={{ position: 'absolute', top: '35%', left: '5%', width: '90%', height: '25%', border: `6px solid ${COLOR_TOKENS.primary}`, borderRadius: 25, boxShadow: `0 0 0 1000px rgba(0,0,0,0.4)`, opacity: interpolate(frame, [board1Highlight, board1Highlight + 15], [0, 1]), transform: `scale(${spring({ frame: frame - board1Highlight, fps })})` }} />
                    )}
                </div>
            </div>

            {/* Dashboard 2 — positioned independently, extends to bottom edge */}
            <div style={{ position: 'absolute', top: 200, left: 60, right: 60, bottom: -1, opacity: interpolate(frame, [board2Start, board2Start + 20, board2End, board2End + 20], [0, 1, 1, 0], { extrapolateRight: 'clamp' }), display: frame >= board2Start ? 'block' : 'none' }}>
                <div style={{ width: '100%', height: '100%', background: 'white', border: `1px solid ${COLOR_TOKENS.border}`, borderRadius: '0px 24px 0px 0px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 80px rgba(0,0,0,0.08)' }}>
                    <Img src={staticFile('media/VW-CBAM.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    {frame > board2Highlight && (
                        <div style={{ position: 'absolute', top: '40%', left: '8%', width: '84%', height: '20%', border: `6px solid ${COLOR_TOKENS.primary}`, borderRadius: 25, boxShadow: `0 0 0 1000px rgba(0,0,0,0.4)`, opacity: interpolate(frame, [board2Highlight, board2Highlight + 15], [0, 1]), transform: `scale(${spring({ frame: frame - board2Highlight, fps })})` }} />
                    )}
                </div>
            </div>
        </AbsoluteFill>
    );
};
