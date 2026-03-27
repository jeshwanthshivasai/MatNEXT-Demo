import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries } from "@remotion/transitions";

// Scenes
import { Section1_Intro } from './scenes/overhaul/Section1_Intro';
import { Section_Flow } from './components/overhaul/Section_Flow';
import { Section1b_Traceability } from './scenes/overhaul/Section1b_Traceability';
import { Section_Map } from './scenes/overhaul/Section_Map';
import { Section2_OEM } from './scenes/overhaul/Section2_OEM';
import { Section3_SupplyChain } from './scenes/overhaul/Section3_SupplyChain';
import { Section4_Compliance } from './scenes/overhaul/Section4_Compliance';
import { Section5_FutureScope } from './scenes/overhaul/Section5_FutureScope';
import { Outro } from './scenes/Outro';

export const Main2: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            <TransitionSeries>
                {/* 1. Intro (2s = 60 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Section1_Intro />
                </TransitionSeries.Sequence>

                {/* Stakeholders Removed from Main2 as requested */}

                {/* 2. Plastic Flows (9.5s = 285 frames) */}
                <TransitionSeries.Sequence durationInFrames={135}>
                    <Section_Flow hideBlip={true} src="tata_media/Plastic Overall Flow.png" title="End-to-End Plastic Traceability" centerTitle subtitle="(Actual data captured in MatNEXT system)" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow hideBlip={true} src="tata_media/Plastic Phase 1.png" title="Phase 1: Capturing Data at the point of Recovery" scale={1.2} translateX={-60} translateY={-20} overlayTop={110} overlayBottom={50} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow hideBlip={true} src="tata_media/Plastic Phase 2.png" title="Phase 2: Tracking Material Transformation through Recycling" scale={1.22} translateX={-70} translateY={-23} overlayTop={90} overlayBottom={60} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow hideBlip={true} src="tata_media/Plastic Phase 3.png" title="Phase 3: Manufacturing and the Circular Return Loop" scale={1.15} translateX={-10} translateY={-50} overlayTop={115} overlayBottom={105} />
                </TransitionSeries.Sequence>

                {/* 3. Steel Flows (9.5s = 285 frames) */}
                <TransitionSeries.Sequence durationInFrames={135}>
                    <Section_Flow hideBlip={true} src="tata_media/Steel Overall Flow.png" title="End-to-End Steel Traceability" backgroundColor="#F1F2F6" scale={1.06} translateX={0} translateY={-5} overlayTop={35} overlayBottom={35} centerTitle subtitle="(Actual data captured in MatNEXT system)" />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow hideBlip={true} src="tata_media/Steel Phase 1.png" title="Phase 1: Capturing Data at the point of Recovery" backgroundColor="#F0F2F5" scale={1.15} translateX={-35} translateY={-5} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow hideBlip={true} src="tata_media/Steel Phase 2.png" title="Phase 2: Tracking Material Transformation through Recycling" scale={1.18} translateX={-1} translateY={-5} />
                </TransitionSeries.Sequence>
                <TransitionSeries.Sequence durationInFrames={50}>
                    <Section_Flow hideBlip={true} src="tata_media/Steel Phase 3.png" title="Phase 3: Manufacturing and the Circular Return Loop" scale={1.27} translateX={-8} translateY={-5} />
                </TransitionSeries.Sequence>

                {/* 4. Traceability Video (11.3s = 340 frames) */}
                <TransitionSeries.Sequence durationInFrames={340}>
                    <Section1b_Traceability hideBlip={true} />
                </TransitionSeries.Sequence>

                {/* 5. Dashboards Combined (24s = 720 frames total) */}

                {/* 5a. MSIL Dashboard (230 frames) */}
                <TransitionSeries.Sequence durationInFrames={230}>
                    <Section2_OEM hideBlip={true} dashboardSrc="tata_media/MSIL-Dashboard.png" />
                </TransitionSeries.Sequence>

                {/* 5b. RVSF Dashboard (130 frames) */}
                <TransitionSeries.Sequence durationInFrames={130}>
                    <Section3_SupplyChain hideBlip={true} dashboardSrc="tata_media/RVSF-Dashboard.png" />
                </TransitionSeries.Sequence>

                {/* 5c. RVSF Map (180 frames) */}
                <TransitionSeries.Sequence durationInFrames={180}>
                    <Section_Map videoSrc="tata_media/RVSF_Map.mp4" />
                </TransitionSeries.Sequence>

                {/* 5d. Compliance Dashboards (490 frames) */}
                <TransitionSeries.Sequence durationInFrames={490}>
                    <Section4_Compliance 
                        cbamSrc="tata_media/CBAM.png"
                        regulatorySrc="tata_media/Regulatory-Landscape.png"
                        vwCbamSrc="tata_media/VW-CBAM.png"
                    />
                </TransitionSeries.Sequence>

                {/* 6. Outro (2s = 60 frames) */}
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
