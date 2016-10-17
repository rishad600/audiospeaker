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
  @Output() selection= new EventEmitter();
  @Output() clickEvent = new EventEmitter();
   public selected:boolean = false;
 
  constructor() { }

  ngOnInit() {
    
  }
  select() {
      this.clickEvent.emit(this.data);
  }
  mousedown() {
      this.draggedStart.emit(this.data);  
  }
  mouseup() {
    this.draggedEnded.emit(this.data);  
  }

  mousemove() {
    this.selection.emit(this.data);
  }

}
