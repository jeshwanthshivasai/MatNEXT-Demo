import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { Toggle } from '../../components/overhaul/Toggle';
import { ToasterTabs } from '../../components/overhaul/ToasterTabs';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';
import { StatTilesContainer } from '../../components/overhaul/StatTilesContainer';

export const Section2_OEM: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Sequence Timings for exactly 170 frames
    const SCENE_START_DELAY = 10;
    const TOGGLE_CENTER_DUR = SCENE_START_DELAY + 25; // 35
    const TOGGLE_MOVE_TIME = 25; // 60
    const DASHBOARD_ENTRANCE = TOGGLE_CENTER_DUR + TOGGLE_MOVE_TIME; // 60
    const TOASTER_WAVE_START = DASHBOARD_ENTRANCE + 10;
    const ISOLATION_FOCUS_START = DASHBOARD_ENTRANCE + 40;
    const SCORE_FOCUS_START = ISOLATION_FOCUS_START + 40;
    const EXIT_START = DASHBOARD_ENTRANCE + 110; // Total 170s

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

    // Move from center to top-right corner, ensuring perfect symmetry
    // Top Margin: 60px
    // Right Margin: 60px 
    // Therefore X = width - ToggleWidth(596) - 60 = width - 656
    const toggleY = interpolate(toggleMoveProgress, [0, 1], [height / 2 - 46, 60]);
    const toggleX = interpolate(toggleMoveProgress, [0, 1], [width / 2 - 298, width - 656]);
    const toggleScale = interpolate(toggleEntrance, [0, 1], [0.8, 1]);

    // 2. Toggle Fade Out (once it triggers the dashboard)
    const toggleFadeOut = spring({
        frame: frame - (TOGGLE_CENTER_DUR + 40), // Start fading mid-move/end-move
        fps,
        config: ANIMATION_TOKENS.slow,
    });
    const toggleOpacity = interpolate(toggleFadeOut, [0, 1], [1, 0]);

    // 3. Vertical Line & Reveal Logic
    const LINE_START = TOGGLE_CENTER_DUR + 10;
    const REVEAL_START = LINE_START + 15;

    const lineAnim = spring({
        frame: frame - LINE_START,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const revealAnim = spring({
        frame: frame - REVEAL_START,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const dashboardAnim = spring({
        frame: frame - DASHBOARD_ENTRANCE,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    const lineHeight = interpolate(lineAnim, [0, 1], [0, 95]); // Height of the two header words

    // 3. Isolation Focus Logic (Zooming into 4 tiles)
    const focusAnim = spring({
        frame: frame - ISOLATION_FOCUS_START,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const dashboardScale = 1; // Zoom removed
    const dashboardTranslateY = 0; // Pan removed
    const overlayOpacity = interpolate(focusAnim, [0, 1], [0, 0.4]);

    // 4. Macro Lens Focus (tiles lift off, background blurs)
    const liftAnim = spring({
        frame: frame - SCORE_FOCUS_START,
        fps,
        config: ANIMATION_TOKENS.slow,
    });
    const tileScale = interpolate(liftAnim, [0, 1], [1, 1.1]);
    const tileLift = interpolate(liftAnim, [0, 1], [0, -60]);
    const tileShiftX = interpolate(liftAnim, [0, 1], [0, -35]);
    const bgBlur = interpolate(liftAnim, [0, 1], [0, 6]);

    // Exit animation (Fade out before transition)
    const exitAnim = interpolate(frame, [EXIT_START, EXIT_START + 30], [1, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background }}>
            {/* Vertical Reveal Line */}
            <div style={{
                position: 'absolute',
                top: 60, // Equal top margin
                left: 60, // Equal left margin
                width: 4,
                height: lineHeight,
                backgroundColor: COLOR_TOKENS.primary,
                // borderRadius: 2,
                opacity: interpolate(lineAnim, [0, 0.1], [0, 1]) * exitAnim,
            }} />

            {/* Header Content (revealed from line) */}
            <div style={{
                position: 'absolute',
                top: 60, // Equal top margin
                left: 80, // 60px base + 20px gap from the vertical line
                opacity: revealAnim * exitAnim,
                clipPath: `inset(0 ${100 - revealAnim * 100}% 0 0)`, // Reveal from left
                transform: `translateX(${interpolate(revealAnim, [0, 1], [-20, 0])}px)`,
            }}>
                <Typography text="Corporate OEM" fontSize={30} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                <Typography delay={15} text="Dashboard" fontSize={24} color={COLOR_TOKENS.textSecondary} fontWeight={400} textAlign="left" />
            </div>

            {/* Main Toggle (Centered then moves) */}
            <div style={{
                position: 'absolute',
                top: toggleY,
                left: toggleX,
                transform: `scale(${toggleScale})`,
                opacity: interpolate(toggleEntrance, [0, 1], [0, 1]) * exitAnim, // Always visible after entrance
                zIndex: 10,
            }}>
                <Toggle mode="corporate" />
            </div>

            {/* Dashboard Content */}
            <AbsoluteFill style={{
                padding: '160px 60px 60px 60px', // Uniform padding around the dashboard area
                opacity: dashboardAnim * exitAnim,
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
                        overflow: liftAnim > 0 ? 'visible' : 'hidden',
                        position: 'relative',
                    }}>
                        <Img
                            src={staticFile('my_media/MSIL-Dashboard.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center',
                                filter: `blur(${bgBlur}px)`,
                            }}
                        />

                        {/* Premium React Tiles Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: '46.5%', // Precise vertical alignment with mockup row
                            left: '5.5%', // Shifted right
                            width: '93.4%', // Adjusted width
                            height: '17.5%', // Matching card height
                            backgroundColor: '#F5F4EB',
                            zIndex: 5,
                            transform: `scale(${tileScale}) translateX(${tileShiftX}px) translateY(${tileLift}px)`,
                            transformOrigin: 'center center',
                        }}>
                            <StatTilesContainer delay={DASHBOARD_ENTRANCE} />
                        </div>

                        {/* Highlight Ring (Appears at ISOLATION_FOCUS_START) */}
                        {frame > ISOLATION_FOCUS_START && (
                            <div style={{
                                position: 'absolute',
                                top: '44.6%', // Slightly larger to encompass the tiles
                                left: '4.7%', // Shifted right to match cards
                                width: '95.2%', // Adjusted width
                                height: '21%',
                                border: `6px solid ${COLOR_TOKENS.primary}`,
                                borderRadius: 25,
                                boxShadow: `0 0 0 1000px rgba(0,0,0,${overlayOpacity * 1.5})`,
                                transform: `scale(${focusAnim * tileScale}) translateX(${tileShiftX}px) translateY(${tileLift}px)`,
                                transformOrigin: 'center center',
                                opacity: focusAnim,
                                zIndex: 6,
                            }} />
                        )}

                        {/* Disclaimer Text (sample data for reference) */}
                        {frame > ISOLATION_FOCUS_START && (
                            <div style={{
                                position: 'absolute',
                                top: '70%',
                                left: '50%',
                                backgroundColor: 'black',
                                padding: '5px 20px',
                                borderRadius: 15,
                                transform: `translateX(-50%) translateY(${interpolate(focusAnim, [0, 1], [0, -35])}px)`,
                                opacity: focusAnim,
                                zIndex: 10,
                            }}>
                                <Typography
                                    text="(sample target data for reference)"
                                    fontSize={25}
                                    color="#96CC39"
                                    fontWeight={400}
                                    textAlign="center"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
