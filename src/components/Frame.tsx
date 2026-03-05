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

    const scale = spring({
        frame: frame - delay,
        fps,
        config: ANIMATION_TOKENS.spring,
    });

    const translateY = interpolate(scale, [0, 1], [40, 0]);

    return (
        <div
            style={{
                background: COLOR_TOKENS.surface,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: `0 20px 80px ${COLOR_TOKENS.shadow}`,
                border: `1px solid ${COLOR_TOKENS.border}`,
                width: '90%',
                height: '75%',
                transform: `scale(${scale}) translateY(${translateY}px)`,
                opacity: scale,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Browser Header */}
            <div style={{
                height: 48,
                background: '#F1F5F9',
                borderBottom: `1px solid ${COLOR_TOKENS.border}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 8,
                zIndex: 10
            }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
                <div style={{
                    marginLeft: 20,
                    height: 24,
                    width: '60%',
                    background: 'white',
                    borderRadius: 4,
                    fontSize: 10,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10,
                    color: COLOR_TOKENS.textSecondary,
                    fontFamily: 'Inter, sans-serif'
                }}>
                    matnext.com/dashboard/maruti-suzuki
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
