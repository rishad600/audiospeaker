export class ReadData {
    public name:string;
    public duration:string;
    public time:string;
    public read:boolean;
    public hightlight:boolean;
    public setTime:number;
    constructor(name,duration,time,read,hightlight,setTime) {
        this.name = name;
        this.duration = duration;
        this.time = time;
        this.read = read;
        this.hightlight = hightlight;
        this.setTime = setTime;
    }
}