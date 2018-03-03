import {Rider} from './rider.model'
import {Lap} from './lap.model'

export class TimeRecord{
    id: number;
    rider: Rider;
    lap: Lap;

    constructor(rider: Rider, lap: Lap) {
        this.rider = rider;
        this.lap = lap;
    }

    time(){
        return this.lap.time();
    }
  }
  