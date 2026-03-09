import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

// Overhauled Scenes
import { Section1_Intro } from './scenes/overhaul/Section1_Intro';
import { Section1b_Traceability } from './scenes/overhaul/Section1b_Traceability';
import { Section2_OEM } from './scenes/overhaul/Section2_OEM';
import { Section3_SupplyChain } from './scenes/overhaul/Section3_SupplyChain';
import { Section4_Compliance } from './scenes/overhaul/Section4_Compliance';
import { Outro } from './scenes/Outro';

export const Main: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            <TransitionSeries>
                <TransitionSeries.Sequence durationInFrames={150}>
                    <Section1_Intro />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Section 1b: Traceability View (18s) */}
                <TransitionSeries.Sequence durationInFrames={540}>
                    <Section1b_Traceability />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />
                <TransitionSeries.Sequence durationInFrames={450}>
                    <Section2_OEM />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />
                <TransitionSeries.Sequence durationInFrames={1350}>
                    <Section3_SupplyChain />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />
                <TransitionSeries.Sequence durationInFrames={630}>
                    <Section4_Compliance />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />
                <TransitionSeries.Sequence durationInFrames={150}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
