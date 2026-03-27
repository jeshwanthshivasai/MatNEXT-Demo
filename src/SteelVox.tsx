import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SteelVoxScene } from './scenes/SteelVoxScene';

export const SteelVox: React.FC = () => {
    return (
        <AbsoluteFill>
            <SteelVoxScene />
        </AbsoluteFill>
    );
};
