import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Calculation:
    // Intro(150) + Traceability(540) + OEM(450) + Supply(1350) + Compliance(630) + Outro(150) = 3420 additive
    // Overlaps: 5 transitions * 30 frames = 150 frames
    // Total Duration: 3420 - 150 = 3270 frames
    return (
        <Composition
            id="Main"
            component={Main}
            durationInFrames={3270}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
