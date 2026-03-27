import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { GlassCard } from '../../components/showreel/GlassCard';
import { TrustSeal } from '../../components/showreel/TrustSeal';
import { Typography } from '../../components/Typography';
import { COLOR_TOKENS } from '../../style/tokens';

export const Scene4_Trust: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
            {/* Digital Security Grid Background */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `radial-gradient(${COLOR_TOKENS.primary}11 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
                opacity: 0.3,
                transform: `perspective(1000px) rotateX(60deg) translateY(${frame}px)`
            }} />

            {/* Central Trust Seal */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10
            }}>
                <TrustSeal />
            </div>

            {/* Floating Trust Metrics */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
                height: '100%',
                paddingBottom: '150px',
                paddingLeft: '100px',
                paddingRight: '100px',
                zIndex: 20
            }}>
                <GlassCard width={400} delay={30}>
                    <Typography text="Blockchain ID" fontSize={28} color={COLOR_TOKENS.primary} fontWeight={700} />
                    <div style={{ marginTop: 10, color: 'white', fontSize: 18 }}>
                        Immutable unique identifier for every material batch processed.
                    </div>
                    <div style={{ marginTop: 15, fontFamily: 'monospace', color: COLOR_TOKENS.primary, opacity: 0.6 }}>
                        0x746d...8a2b
                    </div>
                </GlassCard>

                <GlassCard width={400} delay={60}>
                    <Typography text="Verified Origin" fontSize={28} color={COLOR_TOKENS.primary} fontWeight={700} />
                    <div style={{ marginTop: 10, color: 'white', fontSize: 18 }}>
                        Multi-party validation ensures 100% authenticity of green claims.
                    </div>
                    <div style={{ marginTop: 15, color: '#4ade80', fontWeight: 600 }}>
                        ✓ AUDITED BY SGS & TUV
                    </div>
                </GlassCard>
            </div>

            {/* Header Title */}
            <div style={{
                position: 'absolute',
                top: 80,
                width: '100%',
                textAlign: 'center',
                zIndex: 20
            }}>
                <Typography text="TRUST VERIFIED BY BLOCKCHAIN" fontSize={56} color="white" fontWeight={800} letterSpacing={4} />
            </div>
        </AbsoluteFill>
    );
};
