import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Calculation (Additive):
    // Intro: 150
    // Traceability: 540
    // OEM: 350
    // Supply: 540
    // Compliance: 670
    // Outro: 150
    // Total Additive = 2400
    // Overlaps: 4 transitions * 30 frames = 120 frames
    // Global Duration: 2400 - 120 = 2280 frames
    return (
        <Composition
            id="Main"
            component={Main}
            durationInFrames={2280}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
