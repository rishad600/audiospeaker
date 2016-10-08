import { Component, OnInit, Input, EventEmitter,Output} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-word',
  templateUrl: 'word.component.html',
  styleUrls: ['word.component.css']
})
export class WordComponent implements OnInit {


  @Input() data; 
  @Output() draggedStart= new EventEmitter();
  @Output() draggedEnded= new EventEmitter();
  @Output() drawshade= new EventEmitter();
  @Output() clickToClear = new EventEmitter();
   public selected:boolean = false;
 
  constructor() { }

  ngOnInit() {
    
  }
  
  select() {
      this.clickToClear.emit(1);
  }
  mouseOvered() {
      this.draggedStart.emit(1);  
  }
  mouseup() {
    this.draggedEnded.emit(0);  
  }

  mousemove() {
    this.drawshade.emit(1);
  }

}
