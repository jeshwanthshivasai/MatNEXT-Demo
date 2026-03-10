import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Exact Additive Timeline based on user requirement:
    // Intro: 60
    // Plastic Sequence: 270 (90 + 60 + 60 + 60)
    // Steel Sequence: 270 (90 + 60 + 60 + 60)
    // Traceability: 240
    // MSIL Dashboard: 170
    // RVSF Dashboard: 110
    // Compliance Dashboards: 440
    // Copper: 60
    // Aluminium: 60
    // Outro: 60
    // Total = 1740 frames (58 seconds total)

    return (
        <Composition
            id="Main"
            component={Main}
            durationInFrames={1740}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
