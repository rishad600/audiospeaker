import { Component, OnInit, Input,EventEmitter,Output} from '@angular/core';
declare const window;

@Component({
  moduleId: module.id,
  selector: 'app-progress',
  templateUrl: 'progress.component.html',
  styleUrls: ['progress.component.css']
})
export class ProgressComponent {
    
    @Input() isPlaying;
    @Input() player;
    @Input() length;
    public playedTime: number =0;
    public timer: any;
    public percentage:any = 0;
    constructor() { }
    ngOnChanges(changes) {
       if(changes && changes.isPlaying){
           if(changes.isPlaying.currentValue ==true) {
             this.playedTime = 0; 
             this.showProgress();
           }
           else this.stopTimer();
       }
    }
    showProgress() {
       this.timer =  setInterval(() => {
           if(this.player){
               this.updateProgress(this.player.context.currentTime); 
           }
        },1000)
    }
    stopTimer() {
        window.clearInterval(this.timer);
    }
    updateProgress(time) {
        time = Number(time);
        this.percentage = (time/this.length)*100;
        if(this.percentage >100) {
          this.stopTimer();
        }
    }
}

