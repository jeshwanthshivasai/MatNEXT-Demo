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
                {/* 1. Intro (5s) */}
                <TransitionSeries.Sequence durationInFrames={150}>
                    <Section1_Intro />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />

                {/* 1b. Traceability (18s) - Includes buffer */}
                <TransitionSeries.Sequence durationInFrames={540}>
                    <Section1b_Traceability />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />

                {/* 2. OEM Dashboard (DASHBOARD_ENTRANCE + 150 content + 30 exit) = 350 frames */}
                <TransitionSeries.Sequence durationInFrames={350}>
                    <Section2_OEM />
                </TransitionSeries.Sequence>

                {/* 3. Supply Chain (3 slides * 180 frames each) = 540 frames */}
                {/* Transition OEM -> Supply is a hard cut to match internal slide transitions */}
                <TransitionSeries.Sequence durationInFrames={540}>
                    <Section3_SupplyChain />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />

                {/* 4. Compliance (Extended Overview + standardized boards) = 600 frames */}
                <TransitionSeries.Sequence durationInFrames={600}>
                    <Section4_Compliance />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />

                {/* 5. Outro (5s) */}
                <TransitionSeries.Sequence durationInFrames={150}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
