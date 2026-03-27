import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SteelMojoScene } from './scenes/SteelMojoScene';

export const SteelMojo: React.FC = () => {
    return (
        <AbsoluteFill>
            <SteelMojoScene />
        </AbsoluteFill>
    );
};
