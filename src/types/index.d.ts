export type DoorPatternType = 'plain' | 'panels' | 'glass';
export type BackgroundOption = {
    id: string;
    name: string;
    url: string;
};

export interface DoorProps {
    doorPattern: DoorPatternType;
    frameColor: string;
    handleColor: string;
}

export interface DoorSceneProps extends DoorProps {
    backgroundImage: string;
}

export interface TakeScreenshotProps {
    screenshotRef: React.RefObject<{
        takeScreenshot: () => string;
    }>;
}