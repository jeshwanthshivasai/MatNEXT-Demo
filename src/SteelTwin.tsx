import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SteelTwinScene } from './scenes/SteelTwinScene';

export const SteelTwin: React.FC = () => {
    return (
        <AbsoluteFill>
            <SteelTwinScene />
        </AbsoluteFill>
    );
};
