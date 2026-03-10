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
                    <Section_Flow src="new_media/Plastic Overall Flow.png" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section_Flow src="new_media/Plastic Phase 1.png" scale={1.15} objectPosition="60% 45%" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section_Flow src="new_media/Plastic Phase 2.png" scale={1.35} objectPosition="50% 55%" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section_Flow src="new_media/Plastic Phase 3.png" scale={1.35} objectPosition="50% 55%" />
                </TransitionSeries.Sequence>

                {/* 3. Steel Flows (9s = 270 frames) */}
                <TransitionSeries.Sequence durationInFrames={90}>
                    <Section_Flow src="new_media/Steel Overall Flow.png" scale={1.30} objectPosition="center 60%" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section_Flow src="new_media/Steel Phase 1.png" scale={1.30} objectPosition="center 60%" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section_Flow src="new_media/Steel Phase 2.png" scale={1.30} objectPosition="center 60%" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section_Flow src="new_media/Steel Phase 3.png" scale={1.30} objectPosition="center 60%" />
                </TransitionSeries.Sequence>

                {/* 4. Traceability Video (8s = 240 frames) */}
                <TransitionSeries.Sequence durationInFrames={240}>
                    <Section1b_Traceability />
                </TransitionSeries.Sequence>

                {/* 5. Dashboards Combined (24s = 720 frames total) */}
                {/* 5a. MSIL Dashboard (170 frames) */}
                <TransitionSeries.Sequence durationInFrames={170}>
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

                {/* 6. Copper & Aluminium Flows (4s = 120 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section_Flow src="new_media/Copper Flow.png" scale={1.22} objectPosition="center 50%" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section_Flow src="new_media/Aluminium Flow.png" scale={1.22} objectPosition="center 50%" />
                </TransitionSeries.Sequence>

                {/* 7. Outro (2s = 60 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
