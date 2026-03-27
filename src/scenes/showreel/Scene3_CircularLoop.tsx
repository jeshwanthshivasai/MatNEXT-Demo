import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { GlassCard } from '../../components/showreel/GlassCard';
import { CircularLoop } from '../../components/showreel/CircularLoop';
import { Typography } from '../../components/Typography';
import { COLOR_TOKENS } from '../../style/tokens';

export const Scene3_CircularLoop: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
            {/* Background Atmosphere */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)',
                opacity: 0.5
            }} />

            {/* Central Circular Loop Visualizer */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${interpolate(frame, [0, 300], [0.8, 1])})`,
                zIndex: 5
            }}>
                <CircularLoop />
            </div>

            {/* Sidebar Information */}
            <div style={{
                position: 'absolute',
                left: 80,
                top: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '30px',
                zIndex: 10
            }}>
                <GlassCard width={380} delay={20}>
                    <Typography text="Material Loops" fontSize={24} color={COLOR_TOKENS.primary} fontWeight={700} />
                    <div style={{ marginTop: 10, color: 'white', opacity: 0.8 }}>
                        Automated tracking of 12+ material grades from origin to re-entry.
                    </div>
                </GlassCard>

                <GlassCard width={380} delay={50}>
                    <Typography text="Lifecycle Trust" fontSize={24} color={COLOR_TOKENS.primary} fontWeight={700} />
                    <div style={{ marginTop: 10, color: 'white', opacity: 0.8 }}>
                        Blockchain-verified certificate for every kg of recycled content.
                    </div>
                </GlassCard>
            </div>

            {/* Bottom Title */}
            <div style={{
                position: 'absolute',
                bottom: 60,
                width: '100%',
                textAlign: 'center',
                zIndex: 10
            }}>
                <Typography text="Closing the Loop with Intelligent Data" fontSize={48} color="white" fontWeight={700} letterSpacing={-2} />
            </div>
        </AbsoluteFill>
    );
};
