import React from 'react';
import { AbsoluteFill, Series, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Intro } from './scenes/Intro';
import { Traceability } from './scenes/Traceability';
import { Compliance } from './scenes/Compliance';
import { Sustainability } from './scenes/Sustainability';
import { Outro } from './scenes/Outro';
import { COLOR_TOKENS } from './style/tokens';

export const Main: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: COLOR_TOKENS.background }}>
            <TransitionSeries>
                {/* Intro: 5 seconds */}
                <TransitionSeries.Sequence durationInFrames={150}>
                    <Intro />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Traceability: 10 seconds */}
                <TransitionSeries.Sequence durationInFrames={300}>
                    <Traceability />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Compliance 1: Regulatory Landscape (8 seconds) */}
                <TransitionSeries.Sequence durationInFrames={240}>
                    <Compliance
                        title="Regulatory Command Center"
                        subtitle="Centralized monitoring of India & Global frameworks."
                        mediaUrl="image-5.png"
                    />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Compliance 2: CBAM Readiness (8 seconds) - HIGH VALUE FOR MSIL */}
                <TransitionSeries.Sequence durationInFrames={240}>
                    <Compliance
                        title="Vehicle-Wise CBAM Readiness"
                        subtitle="Export readiness monitoring for Maruti Suzuki models."
                        mediaUrl="image-6.png"
                    />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Sustainability 1: Corporate Score (8 seconds) */}
                <TransitionSeries.Sequence durationInFrames={240}>
                    <Sustainability
                        title="Sustainability Governance"
                        subtitle="Aggregated ESG tracking for Maruti Suzuki India Limited."
                        mediaUrl="image-1.png"
                        stats={{
                            title1: "Corporate Score",
                            value1: "8.9/10",
                            unit1: "Aggregated ESG performance",
                            title2: "Verified Recovery",
                            value2: "730,070",
                            unit2: "Kgs - Steel tracked this quarter"
                        }}
                    />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Sustainability 2: Supplier Score (8 seconds) */}
                <TransitionSeries.Sequence durationInFrames={240}>
                    <Sustainability
                        title="Circular Supply Chain"
                        subtitle="End-to-end visibility into Tier-1 supplier performance."
                        mediaUrl="image-4.png"
                        stats={{
                            title1: "Supplier Score",
                            value1: "6.6/10",
                            unit1: "Average value chain performance",
                            title2: "Total Components",
                            value2: "44 Nos",
                            unit2: "Verified recycled material inputs"
                        }}
                    />
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 30 })}
                />

                {/* Outro: 10 seconds */}
                <TransitionSeries.Sequence durationInFrames={300}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
