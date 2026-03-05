import { Composition } from "remotion";
import { Main } from "./Composition";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Main"
                component={Main}
                durationInFrames={2100} // ~70 seconds at 30fps (Safe buffer for transitions)
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
