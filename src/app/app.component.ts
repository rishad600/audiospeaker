import { Component ,ViewChild,EventEmitter,Output} from '@angular/core';
import {AudioDataService} from './audio-data.service';
import {WordComponent} from './word/word.component';
import {PlayerComponent} from './player/player.component';

import {Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers:[AudioDataService],
  directives: [WordComponent,PlayerComponent],
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
    public currenttimeStamp;
    public _current_end_select_timeout_id:any = null;
    public _current_next_select_timeout_id: any = null;
    public _current_next_select_timeout_id_clear: any = null;


    public player:any;
    

    constructor(public audioData: AudioDataService) {
        for (let audioIndex in audioData.audioData) {

            audioData.audioData[audioIndex].push(false);
            audioData.audioData[audioIndex].push(false)
            let TypeCasted = [
                audioData.audioData[audioIndex],
                Number(audioData.audioData[audioIndex][1]),
                Number(audioData.audioData[audioIndex][2]),
                Number(audioData.audioData[audioIndex][3]),
                audioData.audioData[audioIndex][4],
                audioData.audioData[audioIndex][5]
              ]

            this.realdata.push(TypeCasted)
        }
    }
    getTimeElapsed(value) {
        this.speechhightlight(value);
    }

    press(i) {
        this.presActive = true;
        this.selectStartIndex = i;
    }
    checkIfPlaying() {

    }

    updateTime(i) {
        console.log(i);
    }
    speechhightlight(time) {
        
        let currentTime = time;
        for (let i = 0, len = this.realdata.length; i < len; i += 1) { 
            let is_current_word = (
                (
                    currentTime >= this.realdata[i][1]
                    &&
                    currentTime < this.realdata[i][3]
                )
                ||
                (currentTime < this.realdata[i][3])
            );
            if (is_current_word) {
                if(this.realdata[i+1])
                if(this.realdata[i+1][5] == false) {
                     this.realdata[i][5] = true;
                    this.makeSelection(i,time);
                } 
                break;
            }   
        }   
    }
    makeSelection(i,time) {
        var seconds_until_this_word_ends = this.realdata[i][3] - time; 
        // automatically clear the selection
        clearTimeout(this._current_end_select_timeout_id);
        this._current_end_select_timeout_id = setTimeout(()=>{
            for (let k = 0, len = i; k < len; k += 1) { 
                this.realdata[k][5] = false    
            }
        },Math.max(this.realdata[i][2] * 1000, 0));

        setInterval(()=> {
            for (let k = 0, len = i; k < len; k += 1) { 
                this.realdata[k][5] = false  
            }
        },100);

        //since the sampleing time is very low, we have to make sure that it is taken care of
        //get the next word
        
        var next_word = this.realdata[i + 1];
        if(next_word)
        if (next_word && next_word[2] < .255) {
            let seconds_until_next_word_begins = next_word[2]
            clearTimeout(this._current_next_select_timeout_id);
                this._current_next_select_timeout_id = setTimeout(
                    (i) => {
                        next_word[5] = true
                    },i,
                    Math.max(next_word[2] * 1000, 0)
                );
         }


    }

    audio() {
        this.player = (<HTMLInputElement>document.getElementById('passage-audio'));
        this.player.play();
        this.player.ontimeupdate = this.speechhightlight;

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
