import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, Video, staticFile } from 'remotion';
import { COLOR_TOKENS, ANIMATION_TOKENS } from '../style/tokens';

interface FrameProps {
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    children?: React.ReactNode;
    delay?: number;
}

export const Frame: React.FC<FrameProps> = ({
    mediaUrl,
    mediaType = 'image',
    children,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const anim = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.premium,
    });

    const scale = interpolate(anim, [0, 1], [0.96, 1]);
    const translateY = interpolate(anim, [0, 1], [60, 0]);
    const opacity = interpolate(anim, [0, 0.4], [0, 1]);

    return (
        <div
            style={{
                background: COLOR_TOKENS.surface,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: `0 40px 100px rgba(0,0,0,0.1)`,
                border: `1px solid ${COLOR_TOKENS.border}`,
                width: '90%',
                height: '75%',
                transform: `scale(${scale}) translateY(${translateY}px)`,
                opacity,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Browser Header */}
            <div style={{
                height: 54,
                background: '#F8FAFC',
                borderBottom: `1px solid ${COLOR_TOKENS.border}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                gap: 10,
                zIndex: 10
            }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
                <div style={{
                    marginLeft: 24,
                    height: 28,
                    width: '60%',
                    background: 'white',
                    borderRadius: 8,
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 12,
                    color: COLOR_TOKENS.textSecondary,
                    fontFamily: 'Inter, sans-serif',
                    border: `1px solid ${COLOR_TOKENS.border}`
                }}>
                    www.matnext-app.com/dashboard
                </div>
            </div>

            {/* Browser Content */}
            <div style={{ flex: 1, position: 'relative', background: '#FFFFFF', overflow: 'hidden' }}>
                {mediaUrl ? (
                    mediaType === 'image' ? (
                        <Img
                            src={staticFile(mediaUrl)}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    ) : (
                        <Video
                            src={staticFile(mediaUrl)}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                            muted
                        />
                    )
                ) : (
                    children || (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            color: COLOR_TOKENS.textSecondary,
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            [Media Placeholder]
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
