import React from 'react';
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Composition } from "remotion";
import { FlowAnimator } from "./components/showreel/FlowAnimator";
import { STEEL_FLOW_NODES, STEEL_FLOW_EDGES } from "./components/showreel/FlowDefinitions";

export const SteelFlow: React.FC = () => {
    return (
        <TransitionSeries>
            {/* 1. Steel Overall Overview */}
            <TransitionSeries.Sequence durationInFrames={180}>
                <FlowAnimator 
                    nodes={STEEL_FLOW_NODES} 
                    edges={STEEL_FLOW_EDGES} 
                    title="STEEL MATERIAL LIFECYCLE" 
                />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition 
                presentation={fade()} 
                timing={linearTiming({ durationInFrames: 30 })} 
            />

            {/* 2. Phase 1: Recovery Collection */}
            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={STEEL_FLOW_NODES} 
                    edges={STEEL_FLOW_EDGES} 
                    activePhase={1}
                    title="PHASE 1: RECOVERY & COLLECTION" 
                />
            </TransitionSeries.Sequence>

            {/* 3. Phase 2: Steel Recycler (Vardhman) */}
            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={STEEL_FLOW_NODES} 
                    edges={STEEL_FLOW_EDGES} 
                    activePhase={2}
                    title="PHASE 2: PRECISION RECYCLING" 
                />
            </TransitionSeries.Sequence>

            {/* 4. Phase 3: Tier 1/2/3 Supply & Manufacturing */}
            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={STEEL_FLOW_NODES} 
                    edges={STEEL_FLOW_EDGES} 
                    activePhase={3}
                    title="PHASE 3: SUSTAINABLE MANUFACTURING" 
                />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
        </TransitionSeries>
    );
};
