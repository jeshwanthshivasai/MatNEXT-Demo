import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../../style/tokens';

export const Section5_FutureScope: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame,
        fps,
        config: ANIMATION_TOKENS.slow,
    });

    const opacity = interpolate(anim, [0, 1], [0, 1]);
    const scale = interpolate(anim, [0, 1], [0.95, 1]);

    // Duration is 90 frames (3s)
    const DURATION = 90;
    const exitAnim = interpolate(frame, [DURATION - 15, DURATION], [1, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ 
            backgroundColor: COLOR_TOKENS.background,
            opacity: exitAnim,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 60
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 32,
                boxShadow: '0 30px 100px rgba(0,0,0,0.12)',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `scale(${scale})`,
                opacity: opacity
            }}>
                <Img 
                    src={staticFile('new_media/Future Scope.png')} 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: 20
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
