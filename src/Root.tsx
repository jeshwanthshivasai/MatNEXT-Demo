import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Calculation (Additive):
    // Intro: 90
    // Traceability: 240
    // OEM: 350
    // Supply: 180 (RVSF only)
    // Compliance: 630
    // Outro: 90
    // Total Additive = 1580
    // Overlaps: 2 transitions * 30 frames = 60 frames
    // Global Duration: 1580 - 60 = 1520 frames
    return (
        <Composition
            id="Main"
            component={Main}
            durationInFrames={1520}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
