import {Rider} from './rider.model'
import {Lap} from './lap.model'

export class TimeRecord{
    id: number;
    rider: Rider;
    lap: Lap;
    deltaTime: number;
    deltaPercentage: number;

    constructor(rider: Rider, lap: Lap, previousTimestamp: number) {
        this.rider = rider;
        this.lap = lap;
        this.computeDelta(previousTimestamp);
    }

    time(){
        return this.lap.time();
    }

    computeDelta(previousTimeInterval){
        this.deltaTime = this.lap.time() - previousTimeInterval;
        this.deltaPercentage = ((this.deltaTime)/previousTimeInterval)*100;
    }
  }
  