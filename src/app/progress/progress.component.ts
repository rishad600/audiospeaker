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
    @Input() track;
    @Input() progress;
    public playedTime: number =0;
    public timer: any;
    public percentage:any = 0;
    constructor() { }
    // ngOnChanges(changes) {
    //    this.percentage = 0;
    //    if(changes && changes.isPlaying){
    //        if(changes.isPlaying.currentValue ==true) {
    //          this.playedTime = 0; 
    //          this.showProgress();
    //        }
    //        else this.stopTimer();
    //    }
    // }
    
    stopTimer() {
        window.clearInterval(this.timer);
        this.percentage = 0;
    }
    
}

