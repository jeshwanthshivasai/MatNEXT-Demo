import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

interface SectionFlowProps {
    src: string;
}

export const Section_Flow: React.FC<SectionFlowProps> = ({ src }) => {
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
                {/* Crop exactly to the content inside the tablet frame. 
                    Scale by 1.15 to blow past the black tablet borders. */}
                <Img
                    src={staticFile(src)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transform: 'scale(1.18)', // This will crop out the outer tablet border if the image is structured like standard mockups
                        transformOrigin: 'center center'
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
