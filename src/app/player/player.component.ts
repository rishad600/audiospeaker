import { Component, OnInit,EventEmitter,Output,Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {DomSanitizer} from '@angular/platform-browser';



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
    public nowBuffering: any = [];
    public source: any;
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)(); // define audio context
        this.context.createAnalyser();
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
                this.pushDataToBuffer();

            });
        }
        request.send();
    }

    
    pushDataToBuffer() {
        let myAudioBuffer = this.context.createBuffer(1, this.context.sampleRate*10,this.context.sampleRate);
        let framestart =  this.context.sampleRate* 1;
        let frameend =  this.context.sampleRate*200 + 200;
        for (let i = framestart; i < frameend; i++) {
            this.nowBuffering[this.nowBufferingIndex]  = this.audioBuffer[i];
            this.nowBufferingIndex++;
        }
        this.source = this.context.createBufferSource();
        this.source.buffer = myAudioBuffer;
        this.source.connect(this.context.destination);
        this.source.start();
    }




}
