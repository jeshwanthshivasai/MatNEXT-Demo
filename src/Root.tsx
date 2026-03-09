import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Calculation (Additive):
    // Intro: 150
    // Traceability: 540
    // OEM: 350
    // Supply: 540
    // Compliance: 600 (Split: 4s overview + 5s board1 + 5s board2 + 6s overhead/fades)
    // Outro: 150
    // Total Additive = 2330
    // Overlaps: 4 transitions * 30 frames = 120 frames
    // Global Duration: 2330 - 120 = 2210 frames
    return (
        <Composition
            id="Main"
            component={Main}
            durationInFrames={2210}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
