import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { ReactElement, SyntheticEvent, CSSProperties } from 'react';

type propsAudio = {
    id?: string;
    url: string;
    autoPlay?: boolean;
    controls?: boolean;
    loop?: boolean;
    preload?: 'none' | 'metadata' | 'auto' | '';
    label?: string | ReactElement | null | undefined;
    onError?: (error: any) => void | undefined;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onPrevEvent?: () => void;
    onNextEvent?: () => void;
    onClose?: () => void;
    useButtonClose?: boolean;
    useButtonOpenPrevNext?: boolean;
    onVolumeChange?: (event: SyntheticEvent<HTMLAudioElement>) => void;
    style?: CSSProperties;
    volume?: number;
    onLoadDurationTrack?: (time: number) => void;
    mode?: 'mode1' | 'mode2';
    random?: boolean;
    useButtonRandom?: boolean;
    onRandomChange?: (state: boolean) => void;
};
type state = {
    volume: number;
    loop: boolean;
    time: number;
    button: number;
    duration: number;
    slider: number;
    random?: boolean;
};
declare class BsrAudio extends React.Component<propsAudio, state> {
    audioRef: React.RefObject<HTMLAudioElement>;
    curMode: string;
    constructor(props: propsAudio);
    componentDidMount(): void;
    private renderRandom;
    private renderLoop;
    private handleLoadedMetadata;
    private handleTimeUpdate;
    private playAudio;
    private handleSliderChange;
    private handleVolumeChange;
    private renderButton;
    SetPlay(): void;
    SetPause(): void;
    SetVolume: (volume: number) => void;
    SetTimer(time: number): void;
    GerAudioTag: () => HTMLAudioElement | null;
    private mode1;
    private renderAudio;
    private mode2;
    render(): react_jsx_runtime.JSX.Element;
}

export { BsrAudio };
