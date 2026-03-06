import React from 'react';
import { AbsoluteFill, Series, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

// Overhauled Scenes
import { Section1_Intro } from './scenes/overhaul/Section1_Intro';
import { Section2_OEM } from './scenes/overhaul/Section2_OEM';
import { Section3_SupplyChain } from './scenes/overhaul/Section3_SupplyChain';
import { Section4_Compliance } from './scenes/overhaul/Section4_Compliance';
import { Outro } from './scenes/Outro';

export const Main: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            <TransitionSeries>
                {/* Section 1: Intro (5s) */}
                <TransitionSeries.Sequence durationInFrames={150}>
                    <Section1_Intro />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Section 2: OEM Dashboard (15s) */}
                <TransitionSeries.Sequence durationInFrames={450}>
                    <Section2_OEM />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Section 3: Supply Chain Transition (15s each = 45s total = 1350 frames) */}
                <TransitionSeries.Sequence durationInFrames={1350}>
                    <Section3_SupplyChain />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Section 4: Compliance Mode (10s) */}
                <TransitionSeries.Sequence durationInFrames={300}>
                    <Section4_Compliance />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Section 5 & 6 Placeholders (if any) or jump to Outro */}
                {/* For now, jumping to Outro until more instructions arrive */}
                <TransitionSeries.Sequence durationInFrames={150}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>

            {/* Optional: Add premium background music if available */}
            {/* <Audio src={staticFile("audio/background-track.mp3")} volume={0.4} /> */}
        </AbsoluteFill>
    );
};
