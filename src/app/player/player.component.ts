import { Component, OnInit,EventEmitter,Output,Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ProgressComponent} from '../progress/progress.component';


declare const Recorder: any;
declare const window;
declare const navigator:any;
@Component({
  moduleId: module.id,
  selector: 'app-player',
  templateUrl: 'player.component.html',
  directives: [ProgressComponent],
  styleUrls: ['player.component.css']
})
export class PlayerComponent  implements OnInit{

    @Output() timestampemit = new EventEmitter();
    @Input() track;
    public context: any;;
    public audioBuffer:any;
    public ReadlAudioBuffer: any;
    public nowBuffering: any;
    public nowBufferingIndex: number = 0;
    public source;
    public isPlaying: boolean = false;
    public audioLength: number = 0;
    public isSuspended: boolean = false;
    public timeOutId: any = [];
    constructor() { }

    ngOnInit() {
        try {
          window.AudioContext||window.webkitAudioContext;
          this.context = new AudioContext();
        }
        catch(e) {
          alert('Web Audio API is not supported in this browser');
        }
        this.loadAudio();
    }
    ngOnChanges(changes) {
        if(changes.track.currentValue){
            this.track = changes.track.currentValue; 
            if(this.ReadlAudioBuffer) {
                this.nowBufferingIndex = 0;
                this.fillBuffer();
            }
        }
    }

    loadAudio() {
      this.context = new AudioContext();
      var request = new XMLHttpRequest();
        request.open('GET', 'Luke.2.1-Luke.2.20.mp3', true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            this.context.decodeAudioData(request.response,(buffer) => {
                this.ReadlAudioBuffer  = buffer.getChannelData(0);    
                this.fillBuffer();       
            });
        }
        request.send();
    }
    
    pushToBuffer(index,time) {
        let framestart =  (Number(this.context.sampleRate)* Number(time.time))|0;
        let frameend =  (Number(this.context.sampleRate)*(Number(time.time) + Number(time.duration)))|0;
        for (let i = framestart; i < frameend; i++) {
            this.nowBuffering[this.nowBufferingIndex]  = this.ReadlAudioBuffer[i];
            this.nowBufferingIndex++;
        }
    }
    fillBuffer() {
        let lastElement  = this.track[this.track.length-1];
        this.audioLength = Math.ceil(Number(lastElement.time)+ Number(lastElement.duration));
        let myAudioBuffer = this.context.createBuffer(1, this.context.sampleRate*this.audioLength,this.context.sampleRate);
        this.nowBuffering = myAudioBuffer.getChannelData(0); 
        for(let index in this.track) {
            this.pushToBuffer(index,this.track[index]);
        }
        this.source = this.context.createBufferSource();
        this.source.buffer = myAudioBuffer;
        this.source.connect(this.context.destination);
    }
    stop() {
        this.source.stop();
        this.isPlaying = false;
        this.nowBufferingIndex = 0;
        this.fillBuffer();
    }
    starthightlighting(track) {
        track.obser.emit(track.track.time);
    }
    highlight() {
        for (let k = 0, len = this.track.length; k < len; k += 1) { 
            let id = setTimeout(this.starthightlighting, this.track[k]['time']*1000,{track:this.track[k],index:k,obser:this.timestampemit,context:this.context});
            this.timeOutId.push(id);
        }
    }
    
    play() {
        if(this.isPlaying){
            if (this.isSuspended ==true) {
                this.isSuspended = false;
                this.context.resume();
            } else {
                this.isSuspended = true;
                this.context.suspend();
            }
        } else {
            this.highlight();
            this.isPlaying = true;
            this.isSuspended = false;
            this.source.start();
            
            
        }
    }


}
