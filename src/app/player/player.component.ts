import { Component, OnInit,EventEmitter,Output,Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {DomSanitizer} from '@angular/platform-browser';
import {VisualiserComponent} from '../visualiser/visualiser.component';



declare const Recorder: any;
declare const window;
declare const navigator:any;
@Component({
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent {
    @Input() audioUrl;
    @Input() soundtimestamps;
    public context;
    public audioBuffer: any;
    public nowBufferingIndex: number = 0;
    public PlayableBuffer :any;
    public nowBuffering: any = [];
    public source: any;
    public analyser:any;
    public canvasctx:any;
    public canvas: any;
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)(); // define audio context
    }

    ngAfterViewInit() {
        this.loadAudio();
    }
    ngOnChanges(changes) {
        if(this.audioBuffer) {
            if(changes.soundtimestamps.currentValue) {
                this.nowBufferingIndex = 0;
                this.reorderBuffer();
            }
        }
    }
    loadAudio() {
        var request = new XMLHttpRequest();
        request.open('GET', this.audioUrl, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            this.context.decodeAudioData(request.response,(buffer) => {
                this.audioBuffer  = buffer.getChannelData(0);   
                this.createNewEmptyBuffer();
            });
        }
        request.send();
    }
    reorderBuffer() {
        console.log('reordering buffer');
        this.createNewEmptyBuffer();
    }
    getBufferLength() {
        let lastElement  = this.soundtimestamps[this.soundtimestamps.length-1];
        return Math.ceil(Number(lastElement.time)+ Number(lastElement.duration));
    }
    
    createNewEmptyBuffer() {
        let audioLength     = this.getBufferLength();
        this.PlayableBuffer = this.context.createBuffer(1, this.context.sampleRate*audioLength,this.context.sampleRate);
        this.LooDataIntoEmptyBuffer();
    }
    pushToBuffer(index,time) {
        let framestart =  (Number(this.context.sampleRate)* Number(time.time))|0;
        let frameend =  (Number(this.context.sampleRate)*(Number(time.time) + Number(time.duration)))|0;
        for (let i = framestart; i < frameend; i++) {
            this.nowBuffering[this.nowBufferingIndex]  = this.audioBuffer[i];
            this.nowBufferingIndex++;
        }
    }
    LooDataIntoEmptyBuffer() {
        this.nowBuffering = this.PlayableBuffer.getChannelData(0);
        for(let index in this.soundtimestamps) {
            this.pushToBuffer(index,this.soundtimestamps[index]);
        }
        this.makeBufferSource();
    }

    makeBufferSource() {
        this.analyser = this.context.createAnalyser();
        this.source = this.context.createBufferSource();
        this.source.connect(this.analyser);
        this.source.buffer = this.PlayableBuffer;
        this.source.connect(this.context.destination);
    }

    play() {
        this.source.start();
    }
  
}
