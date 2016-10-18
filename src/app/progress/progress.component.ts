import { Component, OnInit, Input} from '@angular/core';
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
    public timer: any;
    public percentage:any = 0;
    constructor() { }
    ngOnChanges(changes) {
       if(changes && changes.isPlaying){
           if(changes.isPlaying.currentValue ==true) this.showProgress();
           else this.stopTimer();
       }
    }
    showProgress() {
       this.timer =  setInterval(() => {
           if(this.player)
            this.updateProgress(this.player.context.currentTime); 
        },300)
    }
    stopTimer() {
        window.clearInterval(this.timer);
    }
    updateProgress(time) {
        time = Number(time);
        this.percentage = (time/this.length)*100;
        // this.percentage  = this.percentage;
        
    }
}

