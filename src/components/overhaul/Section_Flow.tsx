import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

interface SectionFlowProps {
    src: string;
    scale?: number;
    translateX?: number;
    translateY?: number;
}

export const Section_Flow: React.FC<SectionFlowProps> = ({
    src,
    scale = 1.18,
    translateX = 0,
    translateY = 0
}) => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#F8FAF9' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
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
