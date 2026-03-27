import { Composition } from "remotion";
import { Main } from "./Composition";
import { Showreel } from "./Showreel";
import { SteelFlow } from "./SteelFlow";
import { SteelMojo } from "./SteelMojo";
import { Main2 } from "./Main2";

export const RemotionRoot: React.FC = () => {
    // Exact Additive Timeline based on user requirement:
    // Intro: 60
    // Stakeholders: 60
    // Plastic Sequence: 180
    // Steel Sequence: 180
    // Traceability: 240
    // MSIL Dashboard: 200
    // RVSF Dashboard: 110
    // RVSF Map: 150
    // Compliance Dashboards: 440
    // Future Scope: 90
    // Outro: 60
    // Total = 2220 frames (74 seconds total)

    return (
        <>
            <Composition
                id="Main"
                component={Main}
                durationInFrames={4440}
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="Showreel"
                component={Showreel}
                durationInFrames={1400}
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="SteelFlow"
                component={SteelFlow}
                durationInFrames={700}
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="SteelMojo"
                component={SteelMojo}
                durationInFrames={700}
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="Main2"
                component={Main2}
                durationInFrames={4120}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
