import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

interface SectionFlowProps {
    src: string;
    scale?: number;
    objectPosition?: string;
}

export const Section_Flow: React.FC<SectionFlowProps> = ({
    src,
    scale = 1.18,
    objectPosition = 'center center'
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
                        transform: `scale(${scale})`,
                        objectPosition: objectPosition,
                        transformOrigin: 'center center'
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
