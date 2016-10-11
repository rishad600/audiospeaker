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
           
        let startTime ;;
        if(this.audioData.audioData.words[0]['time']>0) {
            startTime = 0;
        }
        for (let i = 0, len = this.audioData.audioData.words.length; i < len; i += 1) { 
             
             if(startTime != this.audioData.audioData.words[i]['time']) {
                 //insert and empty array 
                 if (this.audioData.audioData.words[i+1]) {
                       let empty = {
                                 'name' : '',
                                 'duration': this.audioData.audioData.words[i]['time'],
                                 'time' : startTime,
                                 'read': false,
                                 'hightlight': false,
                             }
                         this.realdata.push(empty);
                         startTime =   this.audioData.audioData.words[i+1]['time'];
                 }
             }else {
                 let data = {
                                 'name' : this.audioData.audioData.words[i]['name'],
                                 'duration': this.audioData.audioData.words[i]['duration'],
                                 'time' : this.audioData.audioData.words[i]['time'],
                                 'read': false,
                                 'hightlight': false,
                             } 
                       startTime =   this.audioData.audioData.words[i]['time'];
                       this.realdata.push(data);      
             }



         }
        //     console.log(this.realdata);

        //     // audioData.audioData[audioIndex].push(false);
        //     // audioData.audioData[audioIndex].push(false)
            

        //     // let TypeCasted = [
        //     //     audioData.audioData[audioIndex][0],
        //     //     Number(audioData.audioData[audioIndex][1]),
        //     //     Number(audioData.audioData[audioIndex][2]),
        //     //     Number(audioData.audioData[audioIndex][3]),
        //     //     audioData.audioData[audioIndex][4],
        //     //     audioData.audioData[audioIndex][5],
        //     //     audioData.audioData[audioIndex][1]
        //     //   ]
        //     // this.realdata.push(TypeCasted)
        // //}
    }

    // press(i) {
    //     this.presActive = true;
    //     this.selectStartIndex = i;
    // }

    // speechhightlight(time) {
    //     let currentTime = time;
    //     for (let i = 0, len = this.realdata.length; i < len; i += 1) { 
    //         if(this.realdata[i][1] == time) {
    //             if(i>0)
    //             this.realdata[i-1][5] =false;
    //             this.realdata[i][5] = true;
    //             break;
    //         }            
    //     }   
    // }

    // dragged(i) {
    //   this.selectlastIndex = i;
    //    if(this.presActive ==true)
    //     this.colorSelections();     
    // }
    // colorSelections() {
    //   for(let i=0;i < this.realdata.length;i++) {
    //     if(i>= this.selectStartIndex && i<= this.selectlastIndex )
    //     this.realdata[i][4] = true;
    //     else
    //       this.realdata[i][4] = false;
    //   }
    // }

    // released(i) {
    //     this.presActive = false;  
    //     this.clipboard = {start:this.selectStartIndex,end:this.selectlastIndex };
    //     this.selectStartIndex = undefined;
    //     this.selectlastIndex = undefined;
    // }

    // cut() {
    //     this.cliplength = this.clipboard.end-this.clipboard.start+1;
    //     this.copiedData = this.realdata.splice(this.clipboard.start,this.cliplength);
    // }

    // paste() {
    //     for(let i=this.copiedData.length-1;i>=0;i--)  {
    //         this.realdata.splice(this.selectStartIndex+1,0,this.copiedData[i]);
    //     }
    //     let newData = [];
    //     let startTime = this.realdata[0][1];
    //     let duration = 0;
    //     console.log(this.realdata);
    //     for (let l = 0, len = this.realdata.length; l < len; l += 1) { 
    //            if(this.realdata[l] != undefined){
    //               let diff:number = this.realdata[l][3] - this.realdata[l][1]; 
    //                 diff = +diff.toFixed(3);
    //                newData.push ([
    //                    this.realdata[l][0],
    //                    this.realdata[l][1],
    //                    this.realdata[l][2],
    //                    this.realdata[l][1]+this.realdata[l][2],
    //                    this.realdata[l][4],
    //                    this.realdata[l][5],
    //                    Number(startTime.toFixed(3) + diff.toFixed(3))
    //                ])     
    //               //console.log(Number(startTime.toFixed(3) + diff.toFixed(3)));
    //            }
               
    //        startTime = startTime+this.realdata[l][2];
    //        startTime = Number(startTime.toFixed(3));
    //     }
    //     this.realdata = newData;
    //     this.copiedData = [];
    //     this.clipboard.end = this.clipboard.start =0;
    //    // console.log(this.realdata);
    //     // console.log(this.realdata);
    // }

    // clickToClear(i) {
    //     this.selectStartIndex = i;
    //     this.selectlastIndex = i;
    //     this.colorSelections();  
    // }

    // UpdateSelection(time) {
    //     console.log(time);
    // }

    // send(i) {
    //     if(this.presActive == true ) {
    //         this.selectStartIndex = i;
    //     }
    //     if(this.presActive == true) {
    //         this.selectlastIndex = i;
    //     }

    // }
}
