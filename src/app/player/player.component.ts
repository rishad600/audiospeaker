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
    public recroderObj:any;
    constructor() { }

    ngOnInit() {
        navigator.getUserMedia({audio: true}, this.record, function(e) {
          console.log('d');
        });

         try {
         this.windowAudio = window.AudioContext||window.webkitAudioContext;
          this.context = new AudioContext();
          this.loadAudio();
        }
        catch(e) {
          alert('Web Audio API is not supported in this browser');
        }
    }
    record(context) {

        let rec = new Recorder(context);
        rec.record();
        //rec.stop();


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
                this.audioBuffer  = buffer;           
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
    play() {
            this.clearAllPreviousId();
            var frameCount = this.context.sampleRate * 2.0;
            let myAudioBuffer = this.context.createBuffer(1, frameCount, this.context.sampleRate);
               
            let nowBuffering = myAudioBuffer.getChannelData(0);    
            for (var i = 0; i < this.context.sampleRate * 2.0; i++) {
                nowBuffering[i] = Math.random() * 2 - 1;
            }    
            var source = this.context.createBufferSource();
            source.buffer = myAudioBuffer;
            source.connect(this.context.destination);
            source.start();

            // for (let k = 0, len = this.track.length; k < len; k += 1) { 
            //     let timer = (this.track[k].setTime*1000)|0 ;
            //     let id = setTimeout(this.start, timer,{track:this.track[k],source:source,index:k,obser:this.timestampemit,context:this.context});
            //     this.timeOutId.push(id);
            // }
        }


}
