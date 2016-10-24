import { Component, OnInit, Input,EventEmitter,Output} from '@angular/core';
declare const window;

@Component({
  selector: 'app-visualiser',
  templateUrl: 'visualiser.component.html',
  styleUrls: ['visualiser.component.css']
})
export class VisualiserComponent {
    @Input() analyser;
    public canvas;
    public canvasctx;

    ngOnChanges(changes) {
        if(changes.analyser.currentValue) {
            this.createCanvas();
            this.frameLooper();    
        }
        
    }
    createCanvas() {
        this.canvas = document.getElementById('analyser_render');
        this.canvasctx = this.canvas.getContext('2d');    
    }   
    frameLooper() {
        requestAnimationFrame(() => {
            let fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(fbc_array);
            this.canvasctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
            this.canvasctx.fillStyle = '#00CCFF'; // Color of the bars
            let bars = this.canvas.width;
            let bar_x;
            let bar_width;
            let bar_height;    
            for (var i = 0; i < bars; i++) {
                bar_x = i * 3;
                bar_width = 2;
                bar_height = -(fbc_array[i] / 2);
                this.canvasctx.fillRect(bar_x, this.canvas.height, bar_width, bar_height);
            }
            this.frameLooper();
        });
    }
}

