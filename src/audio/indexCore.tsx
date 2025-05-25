//import * as React from "react";
import './index.css'
import {type CSSProperties, type ReactElement, useEffect, useRef, useState} from "react";
import {GrClose} from "react-icons/gr";
import {IoMdPause, IoMdPlay } from "react-icons/io";
import { IoVolumeMedium } from "react-icons/io5";


import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";


type propsAudio={
    url: string,//"https://dl.dropboxusercontent.com/scl/fi/r8kxyy1yyz71wbhefao64/mikhail-krug-kolshhik.mp3?rlkey=tyy8vpof7der2bxgp3x3ylc7v&amp;st=otkmjber&amp;dl=0"
    autoPlay?: boolean,
    controls?:boolean,
    preload?:'none'|'metadata'|'auto'|''
    label?: string|ReactElement|null|undefined,
    onError?: (error: any) => void|undefined,
    onPlay?: () => void,
    onPause?: () => void,
    onEnded?: () => void,
    onPrevEvent?: () => void,
    onNextEvent?: () => void,
    onClose?: () => void,
    style?:CSSProperties
    

}
const iconSize=25;

export default function BsrAudio(props:propsAudio) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(0.5);
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
    function renderButton(){
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
        <div className={'audio-box no-select'} style={props.style}>
            <div className={'box-flex'} >
                <div className={'audio-label-host'} >{props.label}</div>
                <GrClose size={20}  className="audio-icon" onClick={()=>{
                    if(props.onClose) {
                        props.onClose()
                    }
                }}/>
            </div>

            <audio
                autoPlay={props.autoPlay}
                src={props.url}
                ref={audioRef}
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
                    <div style={{width:'100%'}}></div>
                    <IoVolumeMedium className={'icon-volume'} size={30}/>
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

            <div style={{textAlign:'center'}}>
                <TbPlayerTrackPrevFilled
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
                    onClick={()=>{
                        if(props.onNextEvent){
                            props.onNextEvent();
                        }
                    }}
                    size={iconSize} 
                    className={'audio-icon'}/>
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




// export class BsrAudio  extends React.Component<propsAudio> {
//     private refAudio=React.createRef<HTMLAudioElement>();
//     private refButtonPlay=React.createRef<HTMLButtonElement>();
//     private refCurrentTime=React.createRef<HTMLDivElement>();
//     private refTotalTime=React.createRef<HTMLDivElement>();
//     constructor(props:propsAudio) {
//         super(props);
//     }
//     componentDidMount() {
//         this.refAudio.current!.onloadedmetadata=ev => {
//             this.refCurrentTime.current!.innerText='0.00'
//             // @ts-ignore
//             this.refTotalTime.current!.innerText=Math.floor(ev.target.duration/60) +"."+Math.floor(ev.target.duration%60)
//             console.log(ev)
//         }
//         // this.refAudio.current!.play().catch((error) => {
//         //
//         //     alert(error);
//         //     document.addEventListener('click', () => {
//         //         this.refAudio.current!.play()
//         //     }, { once: true } )
//         //
//         //
//         // })
//         // this.refAudio.current!.autoplay=this.props.autoPlay??false
//         // this.refAudio.current!.volume=0
//         // this.refButtonPlay.current!.click();
//     }
//
//     render() {
//         return (
//             <div className="bsrAudio">
//
//                 <audio
//                     ref={this.refAudio}
//                     preload={'audio'}
//                     autoPlay={true}
//                     src={this.props.url}
//
//
//                 >
//
//                 </audio>
//                 <div style={{display: 'flex'}}>
//                     <div ref={this.refCurrentTime}></div>
//                     <div ref={this.refTotalTime}></div>
//                 </div>
//                 <button
//                     onClick={()=>{
//                         setTimeout(()=>{
//                             this.refAudio.current!.play().then()
//                         },1000)
//
//                     }}
//                     ref={this.refButtonPlay}
//                 >play</button>
//
//             </div>
//         );
//     }
// }