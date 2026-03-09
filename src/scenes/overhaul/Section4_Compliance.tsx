import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

export const Section4_Compliance: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // ── 1. Toggle Animation (same as OEM) ──
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

    // ── 2. Timeline ──
    const LINE_START = MOVE_BACK_START + 5;    // 115
    const TEXT_START = LINE_START + 15;         // 130

    // Dashboard 1: CBAM (2s clean + 3s highlight = 150 frames)
    const board1Start = MOVE_BACK_START + 40;  // 150
    const board1Highlight = board1Start + 60;
    const board1End = board1Start + 150;       // 300

    // Dashboard 2: Regulatory Landscape (2s clean + 3s highlight = 150 frames)
    const board2Start = board1End;             // 300
    const board2Highlight = board2Start + 60;
    const board2End = board2Start + 150;       // 450

    // Dashboard 3: Vehicle Wise CBAM (2s clean + 3s highlight = 150 frames)
    const board3Start = board2End;             // 450
    const board3Highlight = board3Start + 60;
    const board3End = board3Start + 150;       // 600

    // Exit Animation
    const exitAnim = interpolate(frame, [board3End, board3End + 30], [1, 0], { extrapolateRight: 'clamp' });

    // ── 3. Header Content Reveal (resets per phase) ──
    let headerTitle = "CBAM Compliance";
    let headerSub = "Dashboard";
    let lineStart = LINE_START;
    let textStart = TEXT_START;

    if (frame >= board3Start) {
        headerTitle = "Vehicle Wise CBAM Compliance";
        headerSub = "Dashboard";
        lineStart = board3Start;
        textStart = board3Start + 10;
    } else if (frame >= board2Start) {
        headerTitle = "Regulatory Landscape";
        headerSub = "Dashboard";
        lineStart = board2Start;
        textStart = board2Start + 10;
    }

    const lineAnim = spring({ frame: frame - lineStart, fps, config: ANIMATION_TOKENS.slow });
    const lineHeight = interpolate(lineAnim, [0, 1], [0, 95]);
    const revealAnim = spring({ frame: frame - textStart, fps, config: ANIMATION_TOKENS.slow });

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

            {/* Dashboard 1: CBAM */}
            <div style={{ position: 'absolute', top: 200, left: 60, right: 60, bottom: -1, opacity: interpolate(frame, [board1Start, board1Start + 20, board1End, board1End + 20], [0, 1, 1, 0], { extrapolateRight: 'clamp' }), display: frame >= board1Start && frame < board1End + 30 ? 'block' : 'none' }}>
                <div style={{ width: '100%', height: '100%', background: 'white', border: `1px solid ${COLOR_TOKENS.border}`, borderRadius: '0px 24px 0px 0px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 80px rgba(0,0,0,0.08)' }}>
                    <Img src={staticFile('media/CBAM.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    {frame > board1Highlight && (
                        <div style={{ position: 'absolute', top: '29%', left: '4%', width: '96%', height: '53%', border: `6px solid ${COLOR_TOKENS.primary}`, borderRadius: 25, boxShadow: `0 0 0 1000px rgba(0,0,0,0.4)`, opacity: interpolate(frame, [board1Highlight, board1Highlight + 15], [0, 1]), transform: `scale(${spring({ frame: frame - board1Highlight, fps, config: ANIMATION_TOKENS.slow })})` }} />
                    )}
                </div>
            </div>

            {/* Dashboard 2: Regulatory Landscape */}
            <div style={{ position: 'absolute', top: 200, left: 60, right: 60, bottom: -1, opacity: interpolate(frame, [board2Start, board2Start + 20, board2End, board2End + 20], [0, 1, 1, 0], { extrapolateRight: 'clamp' }), display: frame >= board2Start && frame < board2End + 30 ? 'block' : 'none' }}>
                <div style={{ width: '100%', height: '100%', background: 'white', border: `1px solid ${COLOR_TOKENS.border}`, borderRadius: '0px 24px 0px 0px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 80px rgba(0,0,0,0.08)' }}>
                    <Img src={staticFile('media/Regulatory-Landscape.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    {frame > board2Highlight && (
                        <div style={{ position: 'absolute', top: '30%', left: '5%', width: '94%', height: '7.5%', border: `6px solid ${COLOR_TOKENS.primary}`, borderRadius: 25, boxShadow: `0 0 0 1000px rgba(0,0,0,0.4)`, opacity: interpolate(frame, [board2Highlight, board2Highlight + 15], [0, 1]), transform: `scale(${spring({ frame: frame - board2Highlight, fps, config: ANIMATION_TOKENS.slow })})` }} />
                    )}
                </div>
            </div>

            {/* Dashboard 3: Vehicle Wise CBAM */}
            <div style={{ position: 'absolute', top: 200, left: 60, right: 60, bottom: -1, opacity: interpolate(frame, [board3Start, board3Start + 20, board3End, board3End + 20], [0, 1, 1, 0], { extrapolateRight: 'clamp' }), display: frame >= board3Start ? 'block' : 'none' }}>
                <div style={{ width: '100%', height: '100%', background: 'white', border: `1px solid ${COLOR_TOKENS.border}`, borderRadius: '0px 24px 0px 0px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 80px rgba(0,0,0,0.08)' }}>
                    <Img src={staticFile('media/VW-CBAM.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    {frame > board3Highlight && (
                        <div style={{ position: 'absolute', top: '23.5%', left: '5%', width: '93.8%', height: '9.5%', border: `6px solid ${COLOR_TOKENS.primary}`, borderRadius: 25, boxShadow: `0 0 0 1000px rgba(0,0,0,0.4)`, opacity: interpolate(frame, [board3Highlight, board3Highlight + 15], [0, 1]), transform: `scale(${spring({ frame: frame - board3Highlight, fps, config: ANIMATION_TOKENS.slow })})` }} />
                    )}
                </div>
            </div>
        </AbsoluteFill>
    );
};
