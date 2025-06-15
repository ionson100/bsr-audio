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
};
type state = {
    volume: number;
    loop: boolean;
    time: number;
    button: number;
    duration: number;
    slider: number;
};
declare class BsrAudio extends React.Component<propsAudio, state> {
    audioRef: React.RefObject<HTMLAudioElement>;
    constructor(props: propsAudio);
    componentDidMount(): void;
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
    GerAudioTag: () => React.RefObject<HTMLAudioElement>;
    render(): react_jsx_runtime.JSX.Element;
}

export { BsrAudio };
