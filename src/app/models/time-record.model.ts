import {Rider} from './rider.model'
import {Lap} from './lap.model'

export class TimeRecord{
    id: number;
    rider: Rider;
    lap: Lap;
    deltaTime: number;
    deltaPercentage: number;

    constructor(rider: Rider, lap: Lap, deltaTime: number, deltaPercentage: number) {
        this.rider = rider;
        this.lap = lap;
        this.deltaTime = deltaTime;
        this.deltaPercentage = deltaPercentage;
    }

    time(){
        return this.lap.time();
    }
  }
  