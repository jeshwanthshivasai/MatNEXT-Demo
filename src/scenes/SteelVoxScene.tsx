import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { PaperTexture } from '../components/showreel/PaperTexture';
import { Typography } from '../components/Typography';
import { COLOR_TOKENS } from '../style/tokens';

import { VoxIcon } from '../components/showreel/VoxIcon';

export const SteelVoxScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#fff' }}>
            <PaperTexture />
            
            {/* Intro Header */}
            <div style={{
                position: 'absolute',
                top: height * 0.4,
                width: '100%',
                textAlign: 'center',
                opacity: interpolate(frame, [0, 20, 80, 100], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
                transform: `translateY(${interpolate(frame, [0, 100], [0, -40])}px)`
            }}>
                <Typography text="STEEL RECYCLING" fontSize={120} fontWeight={900} color="#111" />
                <div style={{
                    width: 400,
                    height: 10,
                    background: COLOR_TOKENS.primary,
                    margin: '20px auto',
                    transform: `scaleX(${interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' })})`
                }} />
                <Typography text="THE CIRCULAR LOOP" fontSize={24} fontWeight={700} color="#555" letterSpacing={10} />
            </div>

            {/* Chapter 1: Recovery (90 - 250) */}
            <div style={{ opacity: interpolate(frame, [90, 110, 230, 250], [0, 1, 1, 0]) }}>
                <div style={{ position: 'absolute', top: 120, left: 100 }}>
                    <Typography text="01 / COLLECTION" fontSize={48} fontWeight={900} color={COLOR_TOKENS.primary} />
                    <div style={{ width: 60, height: 4, background: '#111', marginTop: 10 }} />
                </div>

                <VoxIcon type="scrap" label="Scrap Dealers" delay={110} x={width * 0.3} y={height * 0.5} rotation={-5} />
                <VoxIcon type="oem" label="OEM Collection" delay={130} x={width * 0.5} y={height * 0.6} rotation={3} />
                <VoxIcon type="dealer" label="Car Dealers" delay={150} x={width * 0.7} y={height * 0.5} rotation={-2} />

                {/* Data Callout */}
                <div style={{
                    position: 'absolute',
                    right: 150,
                    top: height * 0.65,
                    opacity: interpolate(frame, [160, 180], [0, 1])
                }}>
                    <Typography text="12,480" fontSize={84} fontWeight={900} color="#111" />
                    <Typography text="VEHICLES RECOVERED ANNUALLY" fontSize={14} fontWeight={700} color="#666" letterSpacing={2} />
                </div>
            </div>

            {/* Chapter 2: Transforming (250 - 410) */}
            <div style={{ opacity: interpolate(frame, [250, 270, 390, 410], [0, 1, 1, 0]) }}>
                <div style={{ position: 'absolute', top: 120, left: 100 }}>
                    <Typography text="02 / TRANSFORMATION" fontSize={48} fontWeight={900} color={COLOR_TOKENS.primary} />
                    <div style={{ width: 60, height: 4, background: '#111', marginTop: 10 }} />
                </div>

                <div style={{ position: 'absolute', top: height * 0.3, right: 150, textAlign: 'right' }}>
                    <Typography text="VARDHMAN" fontSize={64} fontWeight={900} color="#111" />
                    <Typography text="SPECIAL STEELS PARTNER" fontSize={14} fontWeight={700} color="#666" letterSpacing={4} />
                </div>

                <VoxIcon type="recycle" label="Electric Arcing" delay={270} x={width * 0.35} y={height * 0.55} rotation={-3} />
                <VoxIcon type="recycle" label="Refined Rolling" delay={290} x={width * 0.55} y={height * 0.45} rotation={2} />

                {/* Technical Annotation */}
                <div style={{
                    position: 'absolute',
                    left: width * 0.45,
                    top: height * 0.75,
                    opacity: interpolate(frame, [300, 320], [0, 1])
                }}>
                    <div style={{ borderLeft: '3px solid #111', paddingLeft: 20 }}>
                        <Typography text="98%" fontSize={32} fontWeight={900} color="#111" />
                        <Typography text="PURITY MAINTAINED IN LOOP" fontSize={12} fontWeight={700} color="#666" />
                    </div>
                </div>
            </div>

            {/* Chapter 3: Production (410 - 580) */}
            <div style={{ opacity: interpolate(frame, [410, 430, 560, 580], [0, 1, 1, 0]) }}>
                <div style={{ position: 'absolute', top: 120, left: 100 }}>
                    <Typography text="03 / NEW LIFE" fontSize={48} fontWeight={900} color={COLOR_TOKENS.primary} />
                    <div style={{ width: 60, height: 4, background: '#111', marginTop: 10 }} />
                </div>

                <div style={{ position: 'absolute', top: height * 0.3, left: width * 0.35 }}>
                    <Typography text="MARUTI SUZUKI" fontSize={64} fontWeight={900} color="#111" />
                    <Typography text="PRODUCTION INTEGRATION" fontSize={14} fontWeight={700} color="#666" letterSpacing={4} />
                </div>

                <VoxIcon type="production" label="Vehicle Assembly" delay={430} x={width * 0.5} y={height * 0.65} rotation={-1} />

                {/* Final Loop Circle */}
                <svg
                    viewBox="0 0 100 100"
                    style={{
                        position: 'absolute',
                        width: 300,
                        height: 300,
                        left: width * 0.5,
                        top: height * 0.65,
                        transform: 'translate(-50%, -50%)',
                        opacity: interpolate(frame, [450, 480], [0, 0.1])
                    }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={COLOR_TOKENS.primary}
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="2 2"
                    />
                </svg>
            </div>
        </AbsoluteFill>
    );
};
