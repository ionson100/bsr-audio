//import * as React from "react";
import './index.css'
import {type CSSProperties, type ReactElement, type SyntheticEvent, useEffect, useRef, useState} from "react";
import {GrClose} from "react-icons/gr";
import {IoMdPause, IoMdPlay } from "react-icons/io";
import { IoVolumeMedium } from "react-icons/io5";


import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbRepeat } from "react-icons/tb";
import { TbRepeatOff } from "react-icons/tb";



type propsAudio={
    url: string,//"https://dl.dropboxusercontent.com/scl/fi/r8kxyy1yyz71wbhefao64/mikhail-krug-kolshhik.mp3?rlkey=tyy8vpof7der2bxgp3x3ylc7v&amp;st=otkmjber&amp;dl=0"
    autoPlay?: boolean,
    controls?:boolean,
    loop?: boolean,
    preload?:'none'|'metadata'|'auto'|''
    label?: string|ReactElement|null|undefined,
    onError?: (error: any) => void|undefined,
    onPlay?: () => void,
    onPause?: () => void,
    onEnded?: () => void,
    onPrevEvent?: () => void,
    onNextEvent?: () => void,
    onClose?: () => void,
    useButtonClose?: boolean,
    useButtonOpenPrevNext?: boolean,
    onVolumeChange?:(event:SyntheticEvent<HTMLAudioElement>)=> void
    style?:CSSProperties
    

}
const iconSize=25;

export default function BsrAudio(props:propsAudio) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(0.5);
    const [loop, setLoop] = useState(props.loop??false)
    const [currentTime, setCurrentTime] = useState(0);
    const [button, setButton] = useState(0)
    const [duration, setDuration] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
        const audio = audioRef.current;
        if (audio) {
            const errorHandler = (event:any) => {
               if(props.onError){
                   props.onError(event);
               }
                console.error('Audio error:', event);
            };

            audio.addEventListener('error', errorHandler);

            return () => {
                audio.removeEventListener('error', errorHandler);
            };
        }





    }, [volume]);

    const renderLoop = () => {
        if(loop){
            return (
                <TbRepeat size={20} className={'audio-icon'} onClick={()=>{
                    setLoop(!loop);
                }}/>
            )
        }else{
            return (
                <TbRepeatOff size={20} className={'audio-icon'} onClick={()=>{
                    setLoop(!loop);
                }}/>
            )
        }
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current!.duration);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current!.currentTime);
        setSliderValue(audioRef.current!.currentTime);
    };
    const playAudio = () => {
        try {
            audioRef.current!.play();
        } catch (err) {
            if(props.onError){
                props.onError(err);
            }
            console.error('Play error:', err);
        }
    };


    const handleSliderChange = (event:any) => {
        audioRef.current!.currentTime = event.target.value;
        setSliderValue(event.target.value);
    };
    const handleVolumeChange = (event:any) => {
        setVolume(parseFloat(event.target.value));
    };
    const renderButton=()=>{
        switch (button){
            case 0:{
                return (
                    <IoMdPlay size={iconSize} className={'audio-icon'} onClick={()=>{
                        playAudio()
                    }}>Play</IoMdPlay>
                )
            }
            case -1:{
                return (
                    <IoMdPause size={iconSize} className={'audio-icon'} onClick={()=>{
                        audioRef.current!.pause()
                    }}>Play</IoMdPause>
                )
            }
        }

    }

    return (
        <div className={'audio-box no-select'} style={props.style} >
            <div className={'box-flex'} >
                <div className={'audio-label-host'} >{props.label}</div>
                <GrClose
                    style={{display: props.useButtonClose ? 'block' : 'none'}}
                    id={'a-b-1'}
                    size={20}
                    className="audio-icon"
                    onClick={()=>{
                    if(props.onClose) {
                        props.onClose()
                    }
                }}/>
            </div>

            <audio
                autoPlay={props.autoPlay}
                src={props.url}
                ref={audioRef}
                loop={loop}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => {
                    setButton(-1)
                    if(props.onPlay ){
                        props.onPlay();
                    }
                }}
                onPause={()=>{
                    setButton(0)
                    if(props.onPause){
                        props.onPause();
                    }
                }}
                onEnded={()=>{
                    if(props.onEnded ){
                        props.onEnded();
                    }
                }}
                onVolumeChange={(event:SyntheticEvent<HTMLAudioElement>)        => {
                   if(props.onVolumeChange){
                       props.onVolumeChange(event);
                   }
                }}

            />
            <div className={'box-flex'}>
                <div className={'audio-timer'}>
                    {formatTime(currentTime)}
                </div>
                <input

                    className={'audio-input'}
                    type="range"
                    min="0"
                    max={duration}
                    value={sliderValue}
                    onChange={handleSliderChange}
                />
                <div className={'audio-timer'}>
                    {formatTime(duration,true)}
                </div>

            </div>

                <div className={'box-flex'}>
                    <div style={{width:200}}>
                        {renderLoop()}
                    </div>
                    <div className={'box-flex'} style={{alignItems:'center',justifyContent:'center'}}>
                        <TbPlayerTrackPrevFilled
                            style={{visibility: props.useButtonOpenPrevNext ? 'visible' : 'hidden'}}
                            id={'a-b-2'}
                            onClick={()=>{
                                if(props.onPrevEvent){
                                    props.onPrevEvent();
                                }
                            }}
                            size={iconSize}
                            className={'audio-icon'}/>
                        {
                            renderButton()
                        }
                        <TbPlayerTrackNextFilled
                            style={{visibility: props.useButtonOpenPrevNext ? 'visible' : 'hidden'}}
                            id={'a-b-3'}
                            onClick={()=>{
                                if(props.onNextEvent){
                                    props.onNextEvent();
                                }
                            }}
                            size={iconSize}
                            className={'audio-icon'}/>
                    </div>
                    <div className={'box-flex'} style={{width:200}}>

                        <IoVolumeMedium className={'icon-volume'} size={25}/>
                        <input
                            className={'audio-input-volume'}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </div>

            </div>





        </div>

    );
}

const formatTime = (time:number,isTotal=false) => {

    if(isTotal&&time===0){
        return '-:-'
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

