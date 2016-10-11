import { Component, OnInit,EventEmitter,Output,Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';
declare const window;
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
        track.obser.emit(i[1]);
        source.start(0,i[1],i[2]);  
    }
    emit(time) {
        this.timestampemit.emit(time);
    }
    clearAllPreviousId() {
        for(let ids of this.timeOutId) {
            window.clearTimeout(ids);
        }
    }
    play() {
            this.timestampemit.emit(1);
            this.clearAllPreviousId();           
            this.context.onaudioprocess = this.emit;
            for (let k = 0, len = this.track.length; k < len; k += 1) { 
                let source = this.context.createBufferSource(); 
                source.buffer = this.audioBuffer;
                source.connect(this.context.destination);
                let id = setTimeout(this.start, this.track[k][6]*1000,{track:this.track[k],source:source,index:k,obser:this.timestampemit,context:this.context});
                this.timeOutId.push(id);
            }
        }


}
