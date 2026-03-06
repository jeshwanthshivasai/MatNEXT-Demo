import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

export const Section2_OEM: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Sequence Timings
    const SCENE_START_DELAY = 45;
    const TOGGLE_CENTER_DUR = SCENE_START_DELAY + 45; // 1.5 seconds centered instead of 4
    const TOGGLE_MOVE_TIME = 80; // Slightly faster move
    const DASHBOARD_ENTRANCE = TOGGLE_CENTER_DUR + TOGGLE_MOVE_TIME;
    const TOASTER_WAVE_START = DASHBOARD_ENTRANCE + 15;
    const ISOLATION_FOCUS_START = DASHBOARD_ENTRANCE + 60;
    const SCORE_FOCUS_START = ISOLATION_FOCUS_START + 60;

    // 1. Toggle Center Animation
    const toggleEntrance = spring({
        frame: frame - SCENE_START_DELAY,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const isToggleMoving = frame > TOGGLE_CENTER_DUR;
    const toggleMoveProgress = spring({
        frame: frame - TOGGLE_CENTER_DUR,
        fps,
        config: ANIMATION_TOKENS.extraSlow, // Use extraSlow
    });

    // Move from center to top-right
    const toggleY = interpolate(toggleMoveProgress, [0, 1], [height / 2 - 46, 60]);
    const toggleX = interpolate(toggleMoveProgress, [0, 1], [width / 2 - 280, width - 620]);
    const toggleScale = interpolate(toggleEntrance, [0, 1], [0.8, 1]);

    // 2. Toggle Fade Out (once it triggers the dashboard)
    const toggleFadeOut = spring({
        frame: frame - (TOGGLE_CENTER_DUR + 40), // Start fading mid-move/end-move
        fps,
        config: ANIMATION_TOKENS.slow,
    });
    const toggleOpacity = interpolate(toggleFadeOut, [0, 1], [1, 0]);

    // 2. Dashboard/Toaster entrance
    const dashboardAnim = spring({
        frame: frame - DASHBOARD_ENTRANCE,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    // 3. Isolation Focus Logic (Zooming into 4 tiles)
    const focusAnim = spring({
        frame: frame - ISOLATION_FOCUS_START,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const dashboardScale = interpolate(focusAnim, [0, 1], [1, 1.4]);
    const dashboardTranslateY = interpolate(focusAnim, [0, 1], [0, -100]);
    const overlayOpacity = interpolate(focusAnim, [0, 1], [0, 0.4]);

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background }}>
            {/* Header Content (reveals when toggle moves) */}
            <div style={{
                position: 'absolute',
                top: 60,
                left: 60,
                opacity: toggleMoveProgress,
                transform: `translateX(${interpolate(toggleMoveProgress, [0, 1], [-20, 0])}px)`,
            }}>
                <Typography text="Corporate OEM" fontSize={32} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                <Typography delay={15} text="Dashboard" fontSize={18} color={COLOR_TOKENS.textSecondary} fontWeight={500} textAlign="left" />
            </div>

            {/* Main Toggle (Centered then moves) */}
            <div style={{
                position: 'absolute',
                top: toggleY,
                left: toggleX,
                transform: `scale(${toggleScale})`,
                opacity: interpolate(toggleEntrance, [0, 1], [0, 1]) * toggleOpacity,
                zIndex: 10, // Lowered z-index so it doesn't float over focus rings later
                pointerEvents: toggleOpacity < 0.1 ? 'none' : 'auto',
            }}>
                <Toggle mode="corporate" />
            </div>

            {/* Dashboard Content */}
            <AbsoluteFill style={{
                padding: '160px 60px 60px 60px',
                opacity: dashboardAnim,
                transform: `translateY(${interpolate(dashboardAnim, [0, 1], [40, 0])}px)`,
            }}>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    transformOrigin: 'top center',
                    transform: `scale(${dashboardScale}) translateY(${dashboardTranslateY}px)`,
                }}>
                    <ToasterTabs activeIndex={0} delay={TOASTER_WAVE_START} />

                    <div style={{
                        flex: 1,
                        background: 'white',
                        borderRadius: '0 24px 24px 24px',
                        border: `1px solid ${COLOR_TOKENS.border}`,
                        boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <Img
                            src={staticFile('media/MSIL-Dashboard.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />

                        {/* Overlay for Isolation Focus */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'black',
                            opacity: overlayOpacity,
                            pointerEvents: 'none',
                        }} />

                        {/* Highlight Ring (Appears at ISOLATION_FOCUS_START) */}
                        {frame > ISOLATION_FOCUS_START && (
                            <div style={{
                                position: 'absolute',
                                top: '25%', // Manually guesstimating tile position
                                left: '10%',
                                width: '80%',
                                height: '50%',
                                border: `4px solid ${COLOR_TOKENS.primary}`,
                                borderRadius: 24,
                                boxShadow: `0 0 0 1000px rgba(0,0,0,${overlayOpacity * 1.5})`,
                                opacity: focusAnim,
                            }} />
                        )}
                    </div>
                </div>
            </AbsoluteFill>

            {/* Score Focus (Circular Highlight) */}
            {frame > SCORE_FOCUS_START && (
                <div style={{
                    position: 'absolute',
                    top: '35%',
                    right: '15%',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    border: `4px solid ${COLOR_TOKENS.primary}`,
                    boxShadow: `0 0 0 2000px rgba(0,0,0,0.6)`,
                    transform: `scale(${spring({ frame: frame - SCORE_FOCUS_START, fps })})`,
                    zIndex: 200,
                }} />
            )}
        </AbsoluteFill>
    );
};
