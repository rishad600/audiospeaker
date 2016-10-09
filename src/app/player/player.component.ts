import { Component, OnInit,EventEmitter,Output} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent implements OnInit {

    @Output() timestampemit = new EventEmitter();
    public player;
    constructor() { }

    ngOnInit() {

    }
    play() {
        this.player = (<HTMLInputElement>document.getElementById('passage-audio'));
        this.player.play();
        this.player.ontimeupdate = (e) => { this.timestampemit.emit(e.target.currentTime)};
        
    }

    speechhightlight() {
        
        
    }

}
