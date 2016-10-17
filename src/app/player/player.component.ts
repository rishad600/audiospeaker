import { Component, OnInit,EventEmitter,Output,Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';


declare const Recorder: any;
declare const window;
declare const navigator:any;
@Component({
  moduleId: module.id,
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent implements OnInit {

    @Output() timestampemit = new EventEmitter();
    @Input() track;
    public currentTime;
    public context: any;;
    public audioBuffer:any;
    public player;
    public timer:any = [];
    public windowAudio:any;
    public currentGain = 0;;
    public gainNode;
    public timeOutId: any = [];
    public ReadlAudioBuffer: any;
    public recroderObj: any;
    public source;
    constructor() { }

    ngOnInit() {
        try {
         this.windowAudio = window.AudioContext||window.webkitAudioContext;
          this.context = new AudioContext();
          this.loadAudio();
        }
        catch(e) {
          alert('Web Audio API is not supported in this browser');
        }
    }
    ngOnChanges(changes) {
        this.track = changes.track.currentValue;
        //console.log(this.track);
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
    
    start(track) {
        let i = track.track;
        let source = track.source;
        source.start(0,i.time,i.duration);  
        track.obser.emit(i.time);
    }
    
    clearAllPreviousId() {
        for(let ids of this.timeOutId) {
            window.clearTimeout(ids);
        }
    }

    getStartIndex(index) {

    }
    pushToBuffer(index,time) {
        let i =  this.context.sampleRate*time.

        for (i = 0; i < frameCountPerSecond; i++) {
            nowBuffering[i] = this.ReadlAudioBuffer[i];
        }

        this.source = this.context.createBufferSource();
        this.source.buffer = myAudioBuffer;
        this.source.connect(this.context.destination);
        this.source.start();
    }
    fillBuffer() {
        let frameCountPerSecond = this.context.sampleRate*time.time|0;
        let myAudioBuffer = this.context.createBuffer(1, this.context.sampleRate,this.context.sampleRate);
        let nowBuffering = myAudioBuffer.getChannelData(0); 
        
        //for(let time of this.track ) {
            // this.pushToBuffer(this.track[1]);
            // this.pushToBuffer(this.track[2]);
            this.pushToBuffer(4,this.track[4]);
            //break;
        //}
    }
    
    play() {
        this.loadAudio();
    }


}
