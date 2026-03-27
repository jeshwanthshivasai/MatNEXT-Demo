import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Typography } from '../components/Typography';
import { COLOR_TOKENS } from '../style/tokens';

// Isometric Projection Helper
// Maps 2D coordinates (x, y) to Isometric (isoX, isoY)
export const toIso = (x: number, y: number, z: number = 0) => {
    // 45-degree isometric projection logic
    const isoX = (x - y) * 0.866; // cos(30)
    const isoY = (x + y) * 0.5 - z; // sin(30)
    return { x: isoX, y: isoY };
};

const IsometricGrid: React.FC = () => {
    const { width, height } = useVideoConfig();
    return (
        <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{
                position: 'absolute',
                inset: -2000, // Expand to cover during camera pans
                backgroundColor: '#ffffff',
                backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                transform: 'rotateX(60deg) rotateZ(45deg)',
                transformOrigin: 'center center',
            }} />
        </AbsoluteFill>
    );
};

import { GlassModule } from '../components/showreel/GlassModule';
import { DataPipe } from '../components/showreel/DataPipe';

interface CarbonNodeProps {
    x: number;
    y: number;
    delay: number;
    val: string;
}

const CarbonNode: React.FC<CarbonNodeProps> = ({ x, y, delay, val }) => {
    const frame = useCurrentFrame();
    return (
        <div style={{
            position: 'absolute',
            left: x,
            top: y,
            opacity: interpolate(frame, [delay, delay + 20], [0, 1]),
            transform: `translate(-50%, -50%) translateZ(40px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 100
        }}>
            <div style={{
                width: 12,
                height: 12,
                background: '#4CAF50',
                borderRadius: '50%',
                boxShadow: '0 0 15px #4CAF50',
                animation: 'pulse 1.5s infinite'
            }} />
            <div style={{
                marginTop: 8,
                background: 'rgba(0,0,0,0.8)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(76, 175, 80, 0.5)'
            }}>
                <Typography text={val} fontSize={10} color="#fff" fontWeight={800} />
            </div>
        </div>
    );
};

const TeleportLoop: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <svg
            style={{
                position: 'absolute',
                width: 2000,
                height: 2000,
                transform: 'translate(-50%, -50%)',
                overflow: 'visible',
                pointerEvents: 'none',
                opacity: 0.15
            }}
        >
            <path
                d="M 800 400 C 1200 800, -1200 -400, -800 400"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeDasharray="10 10"
                style={{ strokeDashoffset: frame }}
            />
        </svg>
    );
};

export const SteelTwinScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const centerX = width / 2;
    const centerY = height / 2;

    const modules = [
        { x: -800, y: 400, label: "RECOVERY", val: "6,607", unit: "ELVs INBOUND", delay: 20 },
        { x: -400, y: 0, label: "SCRAPPING", val: "RVSF", unit: "BALES PROCESSED", delay: 40, isScrapper: true },
        { x: 0, y: -400, label: "SMELTING", val: "1,100", unit: "HEAT JOBS", delay: 60, isSmelter: true },
        { x: 400, y: 0, label: "FORGING", val: "99.1%", unit: "ALLOY PURITY", delay: 80 },
        { x: 800, y: 400, label: "ASSEMBLY", val: "MSIL", unit: "RECYCLED OUTPUT", delay: 100, isAssembly: true },
    ];

    const pipePoints = modules.map(m => ({ x: m.x + 110, y: m.y + 110 }));

    return (
        <AbsoluteFill style={{ backgroundColor: '#fff' }}>
            {/* Global Studio Rim Lighting (Green Sustain) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                boxShadow: `inset 0 0 200px rgba(76, 175, 80, 0.05)`,
                pointerEvents: 'none',
                zIndex: 1000
            }} />

            <IsometricGrid />

            <div style={{
                position: 'absolute',
                inset: 0,
                perspective: '2000px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `translateY(100px)`
            }}>
                <div style={{
                    position: 'relative',
                    width: 0,
                    height: 0,
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(60deg) rotateZ(45deg)',
                }}>
                    <TeleportLoop />
                    
                    <div style={{ transform: 'translate(-50%, -50%)' }}>
                        <DataPipe points={pipePoints} />
                    </div>

                    {modules.map((m, i) => (
                        <GlassModule
                            key={m.label}
                            x={m.x}
                            y={m.y}
                            width={220}
                            height={220}
                            depth={80}
                            label={m.label}
                            statValue={m.val}
                            statLabel={m.unit}
                        >
                            {m.isSmelter && (
                                <div style={{
                                    width: '80%',
                                    height: '80%',
                                    background: 'radial-gradient(circle, #FF5722 0%, transparent 80%)',
                                    opacity: 0.8,
                                    boxShadow: '0 0 50px #FF5722'
                                }} />
                            )}
                            {m.isAssembly && (
                                <div style={{
                                    width: '80%',
                                    height: '50%',
                                    background: 'linear-gradient(135deg, #fff, #ccc)',
                                    borderRadius: '8px 8px 0 0',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2), inset 0 2px 5px #fff',
                                    border: '1px solid #999'
                                }} />
                            )}
                            {m.isScrapper && (
                                <div style={{
                                    width: '60%',
                                    height: '60%',
                                    background: '#777',
                                    borderRadius: '4px',
                                    transform: 'translateZ(10px) rotate(-10deg)',
                                    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ width: 10, height: 2, background: '#444' }} />
                                </div>
                            )}
                        </GlassModule>
                    ))}

                    <CarbonNode x={-600} y={200} delay={120} val="0.42 tCO2e" />
                    <CarbonNode x={-200} y={-200} delay={140} val="0.38 tCO2e" />
                    <CarbonNode x={200} y={-200} delay={160} val="0.22 tCO2e" />
                    <CarbonNode x={600} y={200} delay={180} val="0.12 tCO2e" />
                </div>
            </div>

            <div style={{
                position: 'absolute',
                top: 80,
                left: 100,
                opacity: interpolate(frame, [0, 40], [0, 1])
            }}>
                <Typography text="STEEL SUPPLY CHAIN" fontSize={48} fontWeight={900} color="#111" />
                <Typography text="2.5D ISOMETRIC DIGITAL TWIN" fontSize={14} color={COLOR_TOKENS.primary} fontWeight={800} letterSpacing={4} />
            </div>
        </AbsoluteFill>
    );
};
