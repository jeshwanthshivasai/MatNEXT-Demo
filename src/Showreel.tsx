import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Section1_Intro } from "./scenes/overhaul/Section1_Intro";
import { FlowAnimator } from "./components/showreel/FlowAnimator";
import { 
    PLASTIC_FLOW_NODES, PLASTIC_FLOW_EDGES,
    STEEL_FLOW_NODES, STEEL_FLOW_EDGES 
} from "./components/showreel/FlowDefinitions";
import { Outro } from "./scenes/Outro";

export const Showreel: React.FC = () => {
    return (
        <TransitionSeries>
            {/* 1. Intro (2s = 60 frames) */}
            <TransitionSeries.Sequence durationInFrames={60}>
                <Section1_Intro />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 30 })}
            />

            {/* --- PLASTIC SECTION --- */}

            {/* Plastic Flow Sequence */}
            <TransitionSeries.Sequence durationInFrames={180}>
                <FlowAnimator 
                    nodes={PLASTIC_FLOW_NODES} 
                    edges={PLASTIC_FLOW_EDGES} 
                    title="PLASTIC MATERIAL FLOW" 
                />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition 
                presentation={fade()} 
                timing={linearTiming({ durationInFrames: 30 })} 
            />
            
            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={PLASTIC_FLOW_NODES} 
                    edges={PLASTIC_FLOW_EDGES} 
                    activePhase={1}
                    title="PLASTIC: RECOVERY PHASE" 
                />
            </TransitionSeries.Sequence>
            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={PLASTIC_FLOW_NODES} 
                    edges={PLASTIC_FLOW_EDGES} 
                    activePhase={2}
                    title="PLASTIC: RECYCLING PHASE" 
                />
            </TransitionSeries.Sequence>
            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={PLASTIC_FLOW_NODES} 
                    edges={PLASTIC_FLOW_EDGES} 
                    activePhase={3}
                    title="PLASTIC: MANUFACTURING PHASE" 
                />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition 
                presentation={fade()} 
                timing={linearTiming({ durationInFrames: 30 })} 
            />

            {/* --- STEEL SECTION --- */}

            {/* Steel Flow Sequence */}
            <TransitionSeries.Sequence durationInFrames={180}>
                <FlowAnimator 
                    nodes={STEEL_FLOW_NODES} 
                    edges={STEEL_FLOW_EDGES} 
                    title="STEEL MATERIAL FLOW" 
                />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition 
                presentation={fade()} 
                timing={linearTiming({ durationInFrames: 30 })} 
            />

            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={STEEL_FLOW_NODES} 
                    edges={STEEL_FLOW_EDGES} 
                    activePhase={1}
                    title="STEEL: RECOVERY PHASE" 
                />
            </TransitionSeries.Sequence>
            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={STEEL_FLOW_NODES} 
                    edges={STEEL_FLOW_EDGES} 
                    activePhase={2}
                    title="STEEL: RECYCLING PHASE" 
                />
            </TransitionSeries.Sequence>
            <TransitionSeries.Sequence durationInFrames={150}>
                <FlowAnimator 
                    nodes={STEEL_FLOW_NODES} 
                    edges={STEEL_FLOW_EDGES} 
                    activePhase={3}
                    title="STEEL: MANUFACTURING PHASE" 
                />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 30 })}
            />

            {/* Final Outro (2s = 60 frames) */}
            <TransitionSeries.Sequence durationInFrames={60}>
                <Outro />
            </TransitionSeries.Sequence>
        </TransitionSeries>
    );
};
