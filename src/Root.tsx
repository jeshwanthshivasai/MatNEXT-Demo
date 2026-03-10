import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Exact Additive Timeline based on user requirement:
    // Intro: 60
    // Plastic Sequence: 180 (90 + 30 + 30 + 30) - Shortened phases
    // Steel Sequence: 180 (90 + 30 + 30 + 30) - Shortened phases
    // Traceability: 240
    // MSIL Dashboard: 170
    // RVSF Dashboard: 110
    // Compliance Dashboards: 440
    // Copper: 60
    // Aluminium: 60
    // Outro: 60
    // Total = 1500 frames (50 seconds total)

    return (
        <Composition
            id="Main"
            component={Main}
            durationInFrames={1500}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
