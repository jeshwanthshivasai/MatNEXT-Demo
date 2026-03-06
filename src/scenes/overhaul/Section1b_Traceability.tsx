import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, OffthreadVideo, staticFile } from 'remotion';
import { Typography } from '../../components/Typography';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

export const Section1b_Traceability: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fade in text and content
    const contentFade = spring({
        frame: frame - 15,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background }}>
            <AbsoluteFill style={{
                padding: '150px 60px 60px 60px',
                opacity: contentFade,
            }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    top: 60,
                    left: 60,
                    width: 4,
                    height: 55,
                    backgroundColor: COLOR_TOKENS.primary,
                }} />

                {/* Header Content */}
                <div style={{
                    position: 'absolute',
                    top: 60,
                    left: 80,
                }}>
                    <Typography text="Complete Vehicle Traceability" fontSize={30} fontWeight={600} color={COLOR_TOKENS.text} textAlign="left" />
                    {/* <Typography text="Material Specific Circularity" fontSize={24} color={COLOR_TOKENS.textSecondary} fontWeight={400} textAlign="left" /> */}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{
                        flex: 1,
                        background: 'white',
                        borderRadius: '0 24px 24px 24px',
                        border: `1px solid ${COLOR_TOKENS.border}`,
                        boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <OffthreadVideo
                            src={staticFile('media/Vehicle-Traceability_HD.mp4')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center'
                            }}
                        />
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
