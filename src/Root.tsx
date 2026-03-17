import { Composition } from "remotion";
import { Main } from "./Composition";

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
        <Composition
            id="Main"
            component={Main}
            durationInFrames={2220}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
