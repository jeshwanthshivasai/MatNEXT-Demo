import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    // Intro(150+30) + Traceability(300+30) + OEM(450+30) + Supply(1350+30) + Compliance(630+30) + Outro(150) = 3000 frames
    // Actually Series sequences are additive in duration calculation.
    return (
        <>
            <Composition
                id="Main"
                component={Main}
                durationInFrames={3000}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
