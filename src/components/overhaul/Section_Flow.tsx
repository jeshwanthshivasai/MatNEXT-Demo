import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Typography } from '../Typography';

interface SectionFlowProps {
    src: string;
    scale?: number;
    translateX?: number;
    translateY?: number;
    overlayTop?: number;
    overlayBottom?: number;
    title?: string;
}

export const Section_Flow: React.FC<SectionFlowProps> = ({
    src,
    scale = 1.18,
    translateX = 0,
    translateY = 0,
    overlayTop = 0,
    overlayBottom = 0,
    title
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#F8FAF9' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white', // Added white matte here
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {overlayTop > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: overlayTop,
                        backgroundColor: 'white',
                        zIndex: 2,
                    }} />
                )}
                {overlayBottom > 0 && (
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: overlayBottom,
                        backgroundColor: 'white',
                        zIndex: 2,
                    }} />
                )}

                {title && (
                    <div style={{
                        position: 'absolute',
                        top: 80,
                        right: 120,
                        zIndex: 10,
                        width: '100%',
                        maxWidth: 1000,
                    }}>
                        <Typography
                            text={title}
                            fontSize={48}
                            fontWeight={700}
                            textAlign="right"
                            color="#1A1A1A"
                            delay={10}
                        />
                    </div>
                )}
                <Img
                    src={staticFile(src)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                        transformOrigin: 'center center'
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
