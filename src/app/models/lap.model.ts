export class Lap {
    //this is only a time slice rapresentation
    public startMs: number;
    public endMs: number;
/*
    constructor(startMs: number) {
        this.startMs = startMs;
        this.endMs = 0;
    }

    stop(timeMs: number) {
        this.endMs = timeMs;
    }
    
*/

    constructor(startMs: number, endMs :number) {
        this.startMs = startMs;
        this.endMs = endMs;
    }

    time(){
        return this.endMs - this.startMs;
    }

}