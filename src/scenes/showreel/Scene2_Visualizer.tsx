import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { GlassCard } from '../../components/showreel/GlassCard';
import { ParticleFlow } from '../../components/showreel/ParticleFlow';
import { Typography } from '../../components/Typography';
import { COLOR_TOKENS } from '../../style/tokens';

export const Scene2_Visualizer: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
            {/* Background Particle System */}
            <ParticleFlow />

            {/* Main Content Area */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: '100px',
                gap: '40px',
                zIndex: 10
            }}>
                {/* Left Card: Input Sources */}
                <GlassCard width={450} height={550} delay={10}>
                    <Typography text="Input Sources" fontSize={32} color={COLOR_TOKENS.primary} fontWeight={700} />
                    <div style={{ marginTop: 20 }}>
                        <div style={{ color: 'white', fontSize: 20, marginBottom: 15 }}>• Recycled Steel Scrap</div>
                        <div style={{ color: 'white', fontSize: 20, marginBottom: 15 }}>• Polymer Reclamation</div>
                        <div style={{ color: 'white', fontSize: 20, marginBottom: 15 }}>• ELV Processing Data</div>
                    </div>
                    {/* Abstract SVG Icon */}
                    <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                        <svg width="100" height="100" viewBox="0 0 100 100">
                             <circle cx="50" cy="50" r="40" fill="none" stroke={COLOR_TOKENS.primary} strokeWidth="2" strokeDasharray="10 5" />
                             <circle cx="50" cy="50" r="20" fill={COLOR_TOKENS.primary} fillOpacity="0.2" />
                        </svg>
                    </div>
                </GlassCard>

                {/* Central Focus: MatNEXT AI Engine */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    transform: `scale(${interpolate(frame, [0, 60], [0.95, 1.05], { extrapolateRight: 'clamp' })})`
                }}>
                    <div style={{
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${COLOR_TOKENS.primary}44 0%, transparent 70%)`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: `1px solid ${COLOR_TOKENS.primary}22`,
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: `2px dashed ${COLOR_TOKENS.primary}44`,
                            animation: 'spin 20s linear infinite'
                        }} />
                        <Typography text="AI" fontSize={72} color={COLOR_TOKENS.primary} fontWeight={800} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Typography text="Predictive Multi-Lifecycle Engine" fontSize={24} color="white" fontWeight={500} />
                    </div>
                </div>

                {/* Right Card: Output & Impact */}
                <GlassCard width={450} height={550} delay={40}>
                    <Typography text="Circular Impact" fontSize={32} color={COLOR_TOKENS.primary} fontWeight={700} />
                    <div style={{ marginTop: 20 }}>
                        <div style={{ color: 'white', fontSize: 24, marginBottom: 15, fontWeight: 700 }}>98% Traceability</div>
                        <div style={{ color: 'white', fontSize: 24, marginBottom: 15, fontWeight: 700 }}>45% CO2 Reduction</div>
                        <div style={{ color: 'white', fontSize: 24, marginBottom: 15, fontWeight: 700 }}>Real-time Compliance</div>
                    </div>
                    <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                         <svg width="100" height="60" viewBox="0 0 100 60">
                             <path d="M10 50 Q 30 10 50 40 T 90 20" fill="none" stroke={COLOR_TOKENS.primary} strokeWidth="4" />
                         </svg>
                    </div>
                </GlassCard>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </AbsoluteFill>
    );
};
