import { Component } from '@angular/core';
import {AudioDataService} from './audio-data.service';
import {WordComponent} from './word/word.component';
import {Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers:[AudioDataService],
  directives: [WordComponent],
  styleUrls: ['app.component.css']
})
export class AppComponent {
    public title:any; 
    public realdata:any = [];
    public presActive: Boolean;
    public selectStartIndex:number;
    public selectlastIndex:number;
    public clipboard:any =  {start:0,end:0};
    public cliplength:number = 0;
    public copiedData;
    public time:number = 0;
    constructor(public audioData: AudioDataService) {
        for (let audioIndex in audioData.audioData) {
            audioData.audioData[audioIndex].push(false);
            audioData.audioData[audioIndex].push(false)
            this.realdata.push(audioData.audioData[audioIndex])
        }
      this.startCheckingAudioPlay();
    }
    
    press(i) {
        this.presActive = true;
        this.selectStartIndex = i;
    }
    checkIfPlaying() {

    }

    startCheckingAudioPlay() {
     Observable.interval(50)
          .subscribe((x) => {
            this.highLighttext();
      })
    }

    highLighttext() {
      let currentTime = (<HTMLInputElement>document.getElementById('tracktime')).value;
      for (let i = 0, len = this.realdata.length; i < len; i += 1) { 
        if(currentTime >= this.realdata[i][1] && currentTime < this.realdata[i][3]) {
            this.realdata[i][5] = true;
        }else{
            this.realdata[i][5] = false;
        }
      }

    }
    ontimeupdated() {
      console.log('s');
    }
    dragged(i) {
      this.selectlastIndex = i;
       if(this.presActive ==true)
        this.colorSelections();     
    }
    colorSelections() {
      for(let i=0;i < this.realdata.length;i++) {
        if(i>= this.selectStartIndex && i<= this.selectlastIndex )
        this.realdata[i][4] = true;
        else
          this.realdata[i][4] = false;
      }
    }

    released(i) {
      this.presActive = false;  
      this.clipboard = {start:this.selectStartIndex,end:this.selectlastIndex };
      this.selectStartIndex = undefined;
      this.selectlastIndex = undefined;
    }
    
    cut() {
      this.cliplength = this.clipboard.end-this.clipboard.start+1;
      this.copiedData = this.realdata.splice(this.clipboard.start,this.cliplength);
    }

    paste() {
       for(let ind of this.copiedData) {
         this.realdata.splice(this.selectStartIndex+1,0,ind);
       }
    }

    clickToClear(i) {
      this.selectStartIndex = i;
      this.selectlastIndex = i;
       this.colorSelections();  
    }

    UpdateSelection(time) {
        console.log(time);
    }
    

    send(i) {
      if(this.presActive == true ) {
        this.selectStartIndex = i;
      }
      if(this.presActive == true) {
        this.selectlastIndex = i;
      }

    }





}
