import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Total duration: Intro(180) + OEM(210) + Supply(255) + Compliance(330) + Outro(150) - transitions(4*30)
    // Actually Series sequences are additive in duration calculation.
    // Intro(150+30) + OEM(180+30) + Supply(225+30) + Compliance(300+30) + Outro(150) = 1125 frames
    return (
        <>
            <Composition
                id="Main"
                component={Main}
                durationInFrames={1395}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
