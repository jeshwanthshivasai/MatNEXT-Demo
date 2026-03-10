import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Calculation (Additive):
    // Intro: 60
    // Traceability: 240
    // OEM: 350
    // Supply: 180 (RVSF only)
    // Compliance: 630
    // Outro: 60
    // Total Additive = 1520
    // Overlaps: 1 transition * 30 frames = 30 frames
    // Global Duration: 1520 - 30 = 1490 frames
    return (
        <Composition
            id="Main"
            component={Main}
            durationInFrames={1490}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
