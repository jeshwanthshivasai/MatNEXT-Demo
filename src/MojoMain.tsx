import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries } from "@remotion/transitions";
import { Section1_Intro } from './scenes/overhaul/Section1_Intro';
import { Section1a_Stakeholders } from './scenes/overhaul/Section1a_Stakeholders';
import { Section_Flow } from './components/overhaul/Section_Flow';
import { Section1b_Traceability } from './scenes/overhaul/Section1b_Traceability';
import { Section_Map } from './scenes/overhaul/Section_Map';
import { Section2_OEM } from './scenes/overhaul/Section2_OEM';
import { Section3_SupplyChain } from './scenes/overhaul/Section3_SupplyChain';
import { Section4_Compliance } from './scenes/overhaul/Section4_Compliance';
import { Section5_FutureScope } from './scenes/overhaul/Section5_FutureScope';
import { Outro } from './scenes/Outro';
import { SteelMojoScene } from './scenes/SteelMojoScene';

export const MojoMain: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            <TransitionSeries>
                {/* 1. Intro (60 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section1_Intro />
                </TransitionSeries.Sequence>

                {/* 1a. Stakeholders (60 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section1a_Stakeholders />
                </TransitionSeries.Sequence>

                {/* 2. Plastic Flows (285 frames) */}
                <TransitionSeries.Sequence durationInFrames={135}>
                    <Section_Flow src="new_media/Plastic Overall Flow.png" title="End-to-End Plastic Traceability" centerTitle subtitle="(Actual data captured in MatNEXT system)" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow src="new_media/Plastic Phase 1.png" title="Phase 1: Capturing Data at the point of Recovery" scale={1.2} translateX={-60} translateY={-20} overlayTop={110} overlayBottom={50} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow src="new_media/Plastic Phase 2.png" title="Phase 2: Tracking Material Transformation through Recycling" scale={1.22} translateX={-70} translateY={-23} overlayTop={90} overlayBottom={60} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow src="new_media/Plastic Phase 3.png" title="Phase 3: Manufacturing and the Circular Return Loop" scale={1.15} translateX={-10} translateY={-50} overlayTop={115} overlayBottom={105} />
                </TransitionSeries.Sequence>

                {/* 3. INTEGRATED MOJO FLOW (Replaces static Steel segment) */}
                {/* Mojo is 700 frames */}
                <TransitionSeries.Sequence durationInFrames={700}>
                    <SteelMojoScene />
                </TransitionSeries.Sequence>

                {/* 4. Traceability Video (340 frames) */}
                <TransitionSeries.Sequence durationInFrames={340}>
                    <Section1b_Traceability />
                </TransitionSeries.Sequence>

                {/* 5. Dashboards Combined */}
                <TransitionSeries.Sequence durationInFrames={230}>
                    <Section2_OEM />
                </TransitionSeries.Sequence>

                <TransitionSeries.Sequence durationInFrames={130}>
                    <Section3_SupplyChain />
                </TransitionSeries.Sequence>

                <TransitionSeries.Sequence durationInFrames={180}>
                    <Section_Map />
                </TransitionSeries.Sequence>

                <TransitionSeries.Sequence durationInFrames={490}>
                    <Section4_Compliance />
                </TransitionSeries.Sequence>

                {/* 6. Future Scope (100 frames) */}
                <TransitionSeries.Sequence durationInFrames={100}>
                    <Section5_FutureScope />
                </TransitionSeries.Sequence>

                {/* 7. Outro (60 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
