import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

// Scenes
import { Section1_Intro } from './scenes/overhaul/Section1_Intro';
import { Section_Flow } from './components/overhaul/Section_Flow';
import { Section1b_Traceability } from './scenes/overhaul/Section1b_Traceability';
import { Section2_OEM } from './scenes/overhaul/Section2_OEM';
import { Section3_SupplyChain } from './scenes/overhaul/Section3_SupplyChain';
import { Section4_Compliance } from './scenes/overhaul/Section4_Compliance';
import { Outro } from './scenes/Outro';

export const Main: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            <TransitionSeries>
                {/* 1. Intro (2s = 60 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section1_Intro />
                </TransitionSeries.Sequence>

                {/* 2. Plastic Flows (9s = 270 frames) */}
                <TransitionSeries.Sequence durationInFrames={90}>
                    <Section_Flow src="new_media/Plastic Overall Flow.png" title="End-to-End Plastic Traceability" centerTitle subtitle="(Actual data captured in MatNEXT system)" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={30}>
                    <Section_Flow src="new_media/Plastic Phase 1.png" title="Phase 1: Capturing Data at the point of Recovery" scale={1.2} translateX={-60} translateY={-55} overlayTop={70} overlayBottom={70} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={30}>
                    <Section_Flow src="new_media/Plastic Phase 2.png" title="Phase 2: Tracking Material Transformation through Recycling" scale={1.22} translateX={-70} translateY={-23} overlayTop={90} overlayBottom={60} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={30}>
                    <Section_Flow src="new_media/Plastic Phase 3.png" title="Phase 3: Manufacturing and the Circular Return Loop" scale={1.15} translateX={-10} translateY={-50} overlayTop={115} overlayBottom={105} />
                </TransitionSeries.Sequence>

                {/* 3. Steel Flows (9s = 270 frames) */}
                <TransitionSeries.Sequence durationInFrames={90}>
                    <Section_Flow src="new_media/Steel Overall Flow.png" title="End-to-End Steel Traceability" backgroundColor="#F1F2F6" scale={1.06} translateX={0} translateY={-5} overlayTop={35} overlayBottom={35} centerTitle subtitle="(Actual data captured in MatNEXT system)" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={30}>
                    <Section_Flow src="new_media/Steel Phase 1.png" title="Phase 1: Capturing Data at the point of Recovery" backgroundColor="#F0F2F5" scale={1.15} translateX={-35} translateY={-5} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={30}>
                    <Section_Flow src="new_media/Steel Phase 2.png" title="Phase 2: Tracking Material Transformation through Recycling" scale={1.18} translateX={-1} translateY={-5} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={30}>
                    <Section_Flow src="new_media/Steel Phase 3.png" title="Phase 3: Manufacturing and the Circular Return Loop" scale={1.27} translateX={-8} translateY={-5} />
                </TransitionSeries.Sequence>

                {/* 4. Traceability Video (8s = 240 frames) */}
                <TransitionSeries.Sequence durationInFrames={240}>
                    <Section1b_Traceability />
                </TransitionSeries.Sequence>

                {/* 5. Dashboards Combined (24s = 720 frames total) */}
                {/* 5a. MSIL Dashboard (170 frames) */}
                <TransitionSeries.Sequence durationInFrames={200}>
                    <Section2_OEM />
                </TransitionSeries.Sequence>
                {/* 5b. RVSF Dashboard (110 frames) */}
                <TransitionSeries.Sequence durationInFrames={110}>
                    <Section3_SupplyChain />
                </TransitionSeries.Sequence>
                {/* 5c. Compliance Dashboards (440 frames) */}
                <TransitionSeries.Sequence durationInFrames={440}>
                    <Section4_Compliance />
                </TransitionSeries.Sequence>

                {/* 7. Outro (2s = 60 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
