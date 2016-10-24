import { Component ,ViewChild,EventEmitter,Output,NgZone} from '@angular/core';
import {AudioDataService} from './audio-data.service';
import {WordComponent} from './word/word.component';
import {PlayerComponent} from './player/player.component';
import {ReadData} from './models/readData';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers:[AudioDataService],
  styleUrls: ['app.component.css']
})
export class AppComponent {
    
    public realdata:Array<ReadData> = [];
    public drag:boolean = false;
    public dragStartIndex:number;
    public dragEndIndex:number;
    public pasteBin:any;
    public lastSelected: any;
    public music: string = "./assets/Luke.2.1-Luke.2.20.mp3";
    constructor(public audioData: AudioDataService) {
        this.getAndArrageData();
    }
    returnNewArray() {
         this.realdata = [];   
    }
    
    clickEvent(data: ReadData) {
        data.hightlight = !data.hightlight; 
        this.selection(0,1);//clear all selection
    }
    selectAnotherWord($event) {
        if($event.action =="remove") {
            this.realdata.splice($event.index,1);
            let elem = (Number($event.ind)).toFixed();
            document.getElementById(elem).focus();
        }
    }
    
    draggedStart(e) {
        this.drag = true;
        this.dragStartIndex = e;
    }
    
    draggedEnded(e) {
       this.drag = false;
        this.dragEndIndex = e;
    }
    
    clear() {
        this.dragEndIndex = this.dragStartIndex = 0;
        this.selection(0,1);//clear all selection
        this.pasteBin = undefined;
    }
    
    selection(e,clear) {
        if(this.drag==true || clear ==true) {    
            for(let i=0;i<this.realdata.length;i++) 
                if(i>this.dragStartIndex-1 && i< e)
                    this.realdata[i].hightlight = true;
                else
                    this.realdata[i].hightlight = false;
        }
    }
    
    cut() {
        let cliplength = this.dragEndIndex-this.dragStartIndex;
        this.pasteBin = this.realdata.splice(this.dragStartIndex,cliplength);
    }
    
    paste() {
        for(let i=this.pasteBin.length-1;i>=0;i--)  {
            this.realdata.splice(this.dragStartIndex+1,0,this.pasteBin[i]);
        }
        let time = 0;
        for (let i = 1, len = this.realdata.length; i < len; i += 1) { 
            time = time + Number(this.realdata[i-1].duration);
            this.realdata[i].setTime  = Number(time);
        }
        this.realdata = [...this.realdata.slice(0, 1),this.realdata[1],...this.realdata.slice(2)]
    }

    speechhightlight(time) {

        for (let i = 0, len = this.realdata.length; i < len; i += 1) { 
            if(this.realdata[i].time == time) {
                this.lastSelected = i;
                if(i>0)
                this.realdata[i-1].read =false;
                this.realdata[i].read = true;
                break;
            }            
        }   
    }
    insertBlankRow(name ,duration,time) {
        this.createArray(new ReadData(name ,duration,time,false,false,time));
    }

    checkBlankAudio(prev,pres,fur) {
        if(prev && fur) {
            let preEndtime = +((+prev.time + +prev.duration).toFixed(3)) ;
            if(+(+prev.time + +prev.duration).toFixed(3)!= +pres.time) {
                let duration = (pres.time  - +preEndtime).toFixed(3);
                this.insertBlankRow("",duration,preEndtime);    
            }
        } 
        if(!prev) {
            this.insertBlankRow("",pres.time,0);    
        }
    }
    createArray(newrow) {
        this.realdata = [...this.realdata,newrow];
    }
    getAndArrageData() {
        for (let i = 0, len = this.audioData.audioData.words.length; i < len; i += 1) { 
            this.checkBlankAudio(this.audioData.audioData.words[i-1],this.audioData.audioData.words[i],this.audioData.audioData.words[i+1]);     
            this.createArray(new ReadData(this.audioData.audioData.words[i]['name'] ,this.audioData.audioData.words[i]['duration'],this.audioData.audioData.words[i]['time'],false,false,this.audioData.audioData.words[i]['time']));
         }
    }

}
