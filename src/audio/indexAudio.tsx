
import './index.css'
import {type ChangeEvent, type CSSProperties, type ReactElement, type SyntheticEvent} from "react";

import * as React from "react";



type propsAudio={
    id?:string,
    url: string,
    autoPlay?: boolean,
    controls?:boolean,
    loop?: boolean,
    preload?:'none'|'metadata'|'auto'|''
    label?: string|ReactElement|null|undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    volume?:number;
    onLoadDurationTrack?:(time:number) => void;
    mode?:'mode1'|'mode2';
    random?:boolean;
    useButtonRandom?:boolean;
    onRandomChange?:(state:boolean)=>void;



}
type state={
    volume:number,
    loop:boolean,
    time:number
    button:number
    duration:number
    slider:number
    random?:boolean;
}


export  class BsrAudio extends React.Component<propsAudio, state>{
     audioRef = React.createRef<HTMLAudioElement>();
     curMode='';

    constructor(props:propsAudio) {
        super(props);
        this.curMode= this.props.mode??'mode1';
        this.state = {

            loop:this.props.loop??false,
            volume:this.props.volume??0.5,
            time:0,
            button:0,
            duration:0,
            slider:0,
            random:this.props.random??false,
        }
    }



    componentDidMount() {
        if (this.audioRef.current) {
            this.audioRef.current.volume = this.state.volume;
        }
    }
    private renderRandom(){
        if(!this.props.useButtonRandom) return null;
        if(this.state.random){
            return(
                <svg stroke="currentColor" fill="currentColor" className="audio-icon"
                     strokeWidth="0" viewBox="0 0 32 32" height="20" width="20" xmlns="http://www.w3.org/2000/svg"
                onClick={()=>{
                    this.setState({random:!this.state.random},() => {
                        if(this.props.onRandomChange){
                            this.props.onRandomChange(this.state.random!)
                        }
                    })
                }}>
                    <path d="M 23 3 L 23 7 L 18.40625 7 L 18.125 7.5 L 14.5 13.96875 L 10.59375 7 L 4 7 L 4 9 L 9.40625 9 L 13.34375 16 L 9.40625 23 L 4 23 L 4 25 L 10.59375 25 L 19.59375 9 L 23 9 L 23 13 L 28 8 Z M 16.78125 18 L 15.625 20.0625 L 18.40625 25 L 23 25 L 23 29 L 28 24 L 23 19 L 23 23 L 19.59375 23 Z"/>
                </svg>
            )
        }else{
            return(
                <svg stroke="currentColor" fill="none" strokeWidth="2" className="audio-icon"
                     viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"
                     onClick={()=>{
                         this.setState({random:!this.state.random},() => {
                             if(this.props.onRandomChange){
                                 this.props.onRandomChange(this.state.random!)
                             }
                         })
                     }}
                >
                    <path d="M21 17l-18 0">

                </path><path d="M18 4l3 3l-3 3"></path><path d="M18 20l3 -3l-3 -3"></path><path d="M21 7l-18 0"></path></svg>
            )
        }

    }


    private renderLoop = () => {
        if(this.state.loop){
            return (

                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
                     strokeLinejoin="round" className="audio-icon" height="20" width="20"
                     xmlns="http://www.w3.org/2000/svg" onClick={() => {
                    this.setState({loop: !this.state.loop})
                }}>
                    <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"></path>
                    <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"></path>
                </svg>

        )
        } else {
            return (

                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
                     strokeLinejoin="round" className="audio-icon" height="20" width="20"
                     xmlns="http://www.w3.org/2000/svg" onClick={() => {
                    this.setState({loop: !this.state.loop})
                }}>
                    <path d="M4 12v-3c0 -1.336 .873 -2.468 2.08 -2.856m3.92 -.144h10m-3 -3l3 3l-3 3"></path>
                    <path d="M20 12v3a3 3 0 0 1 -.133 .886m-1.99 1.984a3 3 0 0 1 -.877 .13h-13m3 3l-3 -3l3 -3"></path>
                    <path d="M3 3l18 18"></path>
                </svg>

        )
        }
    }

    private handleLoadedMetadata = () => {

        this.setState({duration: this.audioRef.current!.duration}, () => {
            if (this.props.onLoadDurationTrack) {
                this.props.onLoadDurationTrack(this.audioRef.current!.duration)
            }
        })
    };

    private handleTimeUpdate = () => {
        this.setState({time:this.audioRef.current!.currentTime,slider:this.audioRef.current!.currentTime})
    };
    private playAudio = () => {
        try {
            this.audioRef.current!.play().then();
        } catch (err) {
            if(this.props.onError){
                this.props.onError(err);
            }
            console.error('Play error:', err);
        }
    };


    private handleSliderChange = (event:ChangeEvent<HTMLInputElement>) => {
        this.audioRef.current!.currentTime = parseFloat(event.target.value);
        this.setState({slider:parseFloat(event.target.value)})
    };

    private handleVolumeChange = (event:ChangeEvent<HTMLInputElement>) => {
        this.audioRef.current!.volume = parseFloat(event.target.value);
        this.setState({volume:parseFloat(event.target.value)})

    };
    private renderButton=(mode=1)=>{
        switch (this.state.button){
            case 0:{
                return (

                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                         className="audio-icon" height={mode===1?25:20} width={mode===1?25:20} xmlns="http://www.w3.org/2000/svg" onClick={() => {
                        this.playAudio()
                    }}>
                        <path d="M96 52v408l320-204L96 52z"></path>
                    </svg>

            )
            }
            case -1:{
                return (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                         className="audio-icon" height={mode===1?25:20} width={mode===1?25:20} xmlns="http://www.w3.org/2000/svg"
                         onClick={() => {
                             this.audioRef.current!.pause()
                         }}>
                        <path d="M96 448h106.7V64H96v384zM309.3 64v384H416V64H309.3z"></path>
                    </svg>

            )
            }
        }

    }

    SetPlay(){
        this.playAudio()
    }
    SetPause(){
        this.audioRef.current!.pause()
    }
    SetVolume = (volume:number) => {
        this.audioRef.current!.volume = volume;
        this.setState({volume:volume})
    }
    SetTimer(time:number) {
        this.audioRef.current!.currentTime = time;
        this.setState({slider:time})
    }

    GerAudioTag=()=>{
        return this.audioRef.current;
    }
    private mode1(){
        return (
            <div id={this.props.id} className={'audio-box no-select'} style={this.props.style} >
                <div className={'box-flex'}>
                    <div className={'audio-label-host'}>{this.props.label}</div>

                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" id="a-b-1"
                         className="audio-icon" height="20" width="20" xmlns="http://www.w3.org/2000/svg"
                         style={{display: this.props.useButtonClose ? 'block' : 'none'}}
                         onClick={() => {
                             if (this.props.onClose) {
                                 this.props.onClose()
                             }
                         }}>
                        <path fill="none" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3"></path>
                    </svg>

                </div>

                {
                    this.renderAudio()
                }
                <div className={'box-flex'}>
                    <div className={'audio-timer'}>
                        {formatTime(this.state.time)}
                    </div>
                    <input

                        className={'audio-input'}
                        type="range"
                        min="0"
                        max={this.state.duration}
                        value={this.state.slider}
                        onChange={this.handleSliderChange}
                    />
                    <div className={'audio-timer'}>
                        {formatTime(this.state.duration,true)}
                    </div>

                </div>

                <div className={'box-flex'}>
                    <div className={'host-loop'}>
                        {this.renderLoop()}
                    </div>
                    <div className={'host-loop'}>
                        {this.renderRandom()}
                    </div>
                    <div className={'box-flex host-buttons'}>
                        {
                            this.props.useButtonOpenPrevNext&&(
                                <svg onClick={() => {
                                    if (this.props.onPrevEvent) {
                                        this.props.onPrevEvent();
                                    }
                                }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" id="a-b-2"
                                     className="audio-icon" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z"></path>
                                    <path
                                        d="M9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z"></path>
                                </svg>
                            )
                        }


                        {
                            this.renderButton()
                        }
                        {
                            this.props.useButtonOpenPrevNext&&(
                                <svg  onClick={() => {
                                    if (this.props.onNextEvent) {
                                        this.props.onNextEvent();
                                    }
                                }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" id="a-b-3"
                                      className="audio-icon" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z"></path>
                                    <path
                                        d="M13 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z"></path>
                                </svg>
                            )
                        }

                    </div>
                    <div className={'box-flex host-volume'}>

                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                             className="icon-volume" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M264 416.19a23.92 23.92 0 0 1-14.21-4.69l-.66-.51-91.46-75H88a24 24 0 0 1-24-24V200a24 24 0 0 1 24-24h69.65l91.46-75 .66-.51A24 24 0 0 1 288 119.83v272.34a24 24 0 0 1-24 24zM352 336a16 16 0 0 1-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82 0-19.36-4.66-37.92-14.25-56.73a16 16 0 0 1 28.5-14.54C378.2 208.16 384 231.47 384 256c0 23.83-6 47.78-17.7 71.18A16 16 0 0 1 352 336z"></path>
                            <path
                                d="M400 384a16 16 0 0 1-13.87-24C405 327.05 416 299.45 416 256c0-44.12-10.94-71.52-29.83-103.95A16 16 0 0 1 413.83 136C434.92 172.16 448 204.88 448 256c0 50.36-13.06 83.24-34.12 120a16 16 0 0 1-13.88 8z"></path>
                        </svg>
                        <input
                            className={'audio-input-volume'}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={this.state.volume}
                            onChange={this.handleVolumeChange}
                        />
                    </div>

                </div>


            </div>

        );
    }
    private renderAudio(){
        return (
            <audio

                autoPlay={this.props.autoPlay??false}
                preload={this.props.preload??'auto'}
                src={this.props.url}
                ref={this.audioRef}
                loop={this.state.loop??false}
                onLoadedMetadata={this.handleLoadedMetadata}
                onTimeUpdate={this.handleTimeUpdate}

                onPlay={() => {
                    this.setState({button:-1})
                    if(this.props.onPlay ){
                        this.props.onPlay();
                    }
                }}

                onError={event => {
                    if(this.props.onError){
                        this.props.onError(event);
                    }
                    console.error('Audio error:', event);
                }}

                onPause={()=>{
                    this.setState({button:0})
                    if(this.props.onPause){
                        this.props.onPause();
                    }
                }}
                onEnded={()=>{
                    if(this.props.onEnded ){
                        this.props.onEnded();
                    }
                }}
                onVolumeChange={(event:SyntheticEvent<HTMLAudioElement>)        => {
                    if(this.props.onVolumeChange){
                        this.props.onVolumeChange(event);
                    }
                }}

            />
        )
    }

    private mode2(){
        return (
            <div id={this.props.id} className={'audio-box no-select'} style={this.props.style} >


                {
                    this.renderAudio()
                }

                <div className={'box-flex'}>


                    <div className={'host-loop-mode2'} >
                        {this.renderLoop()}
                    </div>
                    <div className={'host-loop-mode2'}>
                        {
                            this.renderRandom()
                        }
                    </div>
                    <div className={'box-flex host-buttons-mode2'}>
                        {
                            this.props.useButtonOpenPrevNext&&(
                                <svg onClick={() => {
                                    if (this.props.onPrevEvent) {
                                        this.props.onPrevEvent();
                                    }
                                }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" id="a-b-2"
                                     className="audio-icon" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z"></path>
                                    <path
                                        d="M9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z"></path>
                                </svg>
                            )
                        }


                        {
                            this.renderButton(2)
                        }
                        {
                            this.props.useButtonOpenPrevNext&&(
                                <svg  onClick={() => {
                                    if (this.props.onNextEvent) {
                                        this.props.onNextEvent();
                                    }
                                }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" id="a-b-3"
                                      className="audio-icon" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z"></path>
                                    <path
                                        d="M13 5v14c0 .86 1.012 1.318 1.659 .753l8 -7a1 1 0 0 0 0 -1.506l-8 -7c-.647 -.565 -1.659 -.106 -1.659 .753z"></path>
                                </svg>
                            )
                        }

                    </div>

                    <div className={'box-flex'}>
                        <div className={'audio-timer'}>
                            {formatTime(this.state.time)}
                        </div>
                        <input

                            className={'audio-input'}
                            type="range"
                            min="0"
                            max={this.state.duration}
                            value={this.state.slider}
                            onChange={this.handleSliderChange}
                        />
                        <div className={'audio-timer'}>
                            {formatTime(this.state.duration,true)}
                        </div>

                    </div>

                    <div className={'box-flex host-volume-mode2'}>

                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                             className="icon-volume" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M264 416.19a23.92 23.92 0 0 1-14.21-4.69l-.66-.51-91.46-75H88a24 24 0 0 1-24-24V200a24 24 0 0 1 24-24h69.65l91.46-75 .66-.51A24 24 0 0 1 288 119.83v272.34a24 24 0 0 1-24 24zM352 336a16 16 0 0 1-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82 0-19.36-4.66-37.92-14.25-56.73a16 16 0 0 1 28.5-14.54C378.2 208.16 384 231.47 384 256c0 23.83-6 47.78-17.7 71.18A16 16 0 0 1 352 336z"></path>
                            <path
                                d="M400 384a16 16 0 0 1-13.87-24C405 327.05 416 299.45 416 256c0-44.12-10.94-71.52-29.83-103.95A16 16 0 0 1 413.83 136C434.92 172.16 448 204.88 448 256c0 50.36-13.06 83.24-34.12 120a16 16 0 0 1-13.88 8z"></path>
                        </svg>
                        <input
                            className={'audio-input-volume'}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={this.state.volume}
                            onChange={this.handleVolumeChange}
                        />
                    </div>



                </div>



            </div>

        );
    }

    render() {
        return (
            <>
                {
                    this.curMode==='mode1'?this.mode1():this.mode2()
                }
            </>
        )
    }
}


const formatTime = (time: number, isTotal = false) => {

    if (isTotal && time === 0) {
        return '-:-'
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

