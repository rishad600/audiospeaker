import { Component, OnInit,EventEmitter,Output,Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent implements OnInit {

    @Output() timestampemit = new EventEmitter();
    @Input() track;
    public currentTime;
    public player;
    public timer:any = [];
    constructor() { }

    ngOnInit() {

    }
    ngOnChanges(changed) {
      if(this.timer.length >0) {
          
       }
      if(this.player) {
        console.log('new sequence');
        this.player.currentTime = 0;
        this.player.pause();
      }
    }
    play() {
        this.player = (<HTMLInputElement>document.getElementById('passage-audio'));
        this.seek();
        this.player.ontimeupdate = (e) => { this.timestampemit.emit(e.target.currentTime); this.currentTime =e.target.currentTime };
    }

    seek() {
        let timer = 0;
         Observable
          .timer(0,100)
          .subscribe(res => {
            timer = timer+res;
            console.log(timer);
          })
         //  .timeInterval()
         //  .take(3);

       // for (let k = 0, len = this.track.length; k < len; k += 1) { 
          


       //    let ob  = Observable.timer(this.track[k][3]*1000)
       //      .subscribe(res => {
       //        this.player.currentTime =this.track[k][3] ;
       //        console.log(this.player.currentTime);
       //        if(k==6)
       //          this.player.pause();
              
       //      });

      //}
      // for (let k = 0, len = this.track.length; k < len; k += 1) { 
      //      let ob  = Observable.timer(this.track[k][3]*1000);
      //       ob.subscribe(t=> {
      //          this.player.currentTime = Number(this.track[k][3]) ;
      //       });  
      //       this.timer.push(ob);
      //  }
    }


    seekAudio(audio) {

    }

    speechhightlight() {
        
        
    }

}
