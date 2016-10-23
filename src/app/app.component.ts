import { Component,ViewChild,ElementRef,Renderer,NgZone} from '@angular/core';
declare const Audio;
declare const webkitAudioContext;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    public player: any;
    public context: any;
    public analyser: any;
    public canvas: any;
    public canvasctx: any;
    @ViewChild('audio') audio: ElementRef;
    
    constructor(public renderer: Renderer,public ngZone: NgZone) {
        this.player = new Audio();
        this.player.src = 'http://localhost:4200/assets/song.mp3';
        this.player.controls = true;
    }
    ngAfterViewInit() {
        document.getElementById('audio').appendChild(this.player);
        this.player.play();
        this.context = new webkitAudioContext();
        this.analyser = this.context.createAnalyser(); 
        this.canvas = document.getElementById('analyser_render');
        this.canvasctx = this.canvas.getContext('2d');
        let source = this.context.createMediaElementSource(this.player); 
        source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frameLooper();
    }
    
    frameLooper() {
        this.ngZone.runOutsideAngular(() => {
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
                    //  fillRect( x, y, width, height ) // Explanation of the parameters below
                   // console.log(bar_x, this.canvas.height, bar_width, bar_height);
                    this.canvasctx.fillRect(bar_x, this.canvas.height, bar_width, bar_height);
                }
                this.frameLooper();
             });
        });
    }

}
