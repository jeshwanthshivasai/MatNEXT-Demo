import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { 
    Truck, 
    Factory, 
    Flame, 
    Hammer, 
    Car 
} from 'lucide-react';
import { StageNode, DataCounter, Highlighter, CO2Tag } from '../components/showreel/MojoComponents';

export const SteelMojoScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Define Stage Coordinates
    const STAGES = {
        RECOVERY: { x: width * 0.15, y: height * 0.4 },
        SCRAPPING: { x: width * 0.35, y: height * 0.6 },
        SMELTING: { x: width * 0.55, y: height * 0.4 },
        FORGING: { x: width * 0.75, y: height * 0.6 },
        PRODUCTION: { x: width * 0.9, y: height * 0.4 },
    };

    // Flow path logic
    const pathD = `M ${STAGES.RECOVERY.x} ${STAGES.RECOVERY.y} 
                  L ${STAGES.SCRAPPING.x} ${STAGES.SCRAPPING.y} 
                  L ${STAGES.SMELTING.x} ${STAGES.SMELTING.y} 
                  L ${STAGES.FORGING.x} ${STAGES.FORGING.y} 
                  L ${STAGES.PRODUCTION.x} ${STAGES.PRODUCTION.y}
                  C ${width} ${height * 0.1}, ${0} ${height * 0.1}, ${STAGES.RECOVERY.x} ${STAGES.RECOVERY.y}`;

    return (
        <AbsoluteFill className="bg-[#F9F9F9] overflow-hidden">
            {/* 1. Subtle Background Grid */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(0deg, #1a1a1a 0, #1a1a1a 1px, transparent 1px, transparent 40px),
                        repeating-linear-gradient(90deg, #1a1a1a 0, #1a1a1a 1px, transparent 1px, transparent 40px)
                    `
                }}
            />

            {/* 2. SVG Backbone Loop */}
            <svg className="absolute w-full h-full pointer-events-none">
                <path
                    d={pathD}
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d={pathD}
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="20 40"
                    style={{
                        strokeDashoffset: frame * -4
                    }}
                />
            </svg>

            {/* 3. Stage Sequence */}
            <StageNode Icon={Truck} label="Recovery" delay={0} x={STAGES.RECOVERY.x} y={STAGES.RECOVERY.y} />
            <StageNode Icon={Factory} label="Scrapping" delay={150} x={STAGES.SCRAPPING.x} y={STAGES.SCRAPPING.y} />
            <StageNode Icon={Flame} label="Steel Recycler" delay={300} x={STAGES.SMELTING.x} y={STAGES.SMELTING.y} />
            <StageNode Icon={Hammer} label="Tier Supplier" delay={450} x={STAGES.FORGING.x} y={STAGES.FORGING.y} />
            <StageNode Icon={Car} label="Vehicle Production" delay={600} x={STAGES.PRODUCTION.x} y={STAGES.PRODUCTION.y} />

            {/* 4. Data Overlays */}
            <DataCounter value={6607} label="ELVs RECOVERED" delay={80} x={STAGES.RECOVERY.x - 50} y={STAGES.RECOVERY.y + 100} />
            <DataCounter value={1100} label="HEAT JOBS" delay={380} x={STAGES.SMELTING.x - 50} y={STAGES.SMELTING.y + 100} />

            {/* 5. Highlighted Branding */}
            <div className="absolute left-[54%] top-[30%]">
                <Highlighter text="Vardhmān" delay={350} className="text-3xl font-black italic tracking-tighter" />
            </div>
            <div className="absolute left-[74%] top-[68%]">
                <Highlighter text="Satelite Forging" delay={500} className="text-xl font-bold tracking-tight" />
            </div>
            <div className="absolute left-[88%] top-[25%] text-right">
                <Highlighter text="Maruti Suzuki" delay={650} className="text-2xl font-black tracking-tighter" />
            </div>

            {/* 6. CO2 Tags */}
            <CO2Tag val="0.42 tCO2e" delay={180} x={STAGES.SCRAPPING.x + 80} y={STAGES.SCRAPPING.y - 40} />
            <CO2Tag val="0.22 tCO2e" delay={480} x={STAGES.FORGING.x - 80} y={STAGES.FORGING.y - 40} />

            {/* Header */}
            <div className="absolute top-16 left-16">
                <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-[#4CAF50] animate-pulse" />
                    <span className="text-xs font-black tracking-[0.5em] text-[#4CAF50] uppercase">Live Supply Chain Sync</span>
                </div>
                <h1 className="text-7xl font-black text-[#1A1A1A] tracking-tighter mt-4 leading-[0.8]">
                    STEEL OVERALL FLOW
                </h1>
            </div>
        </AbsoluteFill>
    );
};
