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

    
    createNewEmptyBuffer() {
        this.PlayableBuffer = this.context.createBuffer(1, this.context.sampleRate*2,this.context.sampleRate);
        this.putDataIntoEmptyBuffer();
    }

    putDataIntoEmptyBuffer() {
        this.nowBuffering = this.PlayableBuffer.getChannelData(0);
        for (let i = 0; i < this.context.sampleRate * 2.0; i++) {
            this.nowBuffering[i] = Math.random() * 2 - 1;
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
