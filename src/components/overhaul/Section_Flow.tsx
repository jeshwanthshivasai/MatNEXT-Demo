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
    backgroundColor?: string;
}

export const Section_Flow: React.FC<SectionFlowProps> = ({
    src,
    scale = 1.18,
    translateX = 0,
    translateY = 0,
    overlayTop = 0,
    overlayBottom = 0,
    title,
    backgroundColor = 'white'
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#F8FAF9' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: backgroundColor,
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
                        backgroundColor: backgroundColor,
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
                        backgroundColor: backgroundColor,
                        zIndex: 2,
                    }} />
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

                {title && (
                    <div style={{
                        position: 'absolute',
                        top: 65,
                        // backgroundColor: '#96CC39',
                        right: 60,
                        zIndex: 10,
                        width: 1100,
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
            </div>
        </AbsoluteFill>
    );
};
