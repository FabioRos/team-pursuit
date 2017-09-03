import { Component } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
//import { StopwatchService} from '../services/stopwatch.service'
import { SimplifiedStopwatchService} from '../services/simplified-stopwatch.service'



import {Rider} from '../models/rider.model';
import {TimeRecord} from '../models/time-record.model';

import {RIDERS} from '../mocks/riders.mock';

@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
 // providers: [StopwatchService]
  providers: [SimplifiedStopwatchService]
  
})

export class TrackerComponent {
  riders = RIDERS;


  public started: boolean;
  public stopwatchService: SimplifiedStopwatchService;
  //public stopwatchService: StopwatchService;
  public time: number;

  private timer: any;

//  constructor(stopwatchService: StopwatchService) {
  constructor(stopwatchService: SimplifiedStopwatchService) {
        SimplifiedStopwatchService
      this.stopwatchService = stopwatchService;
      this.time = 0;
      this.started = false;
  }

  formatTime(timeMs: number) {
      let minutes: string,
          seconds: string;

      minutes = Math.floor(timeMs / 60000).toString();
      seconds = ((timeMs % 60000) / 1000).toFixed(3);
      return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
  }

  /*
  getUpdate() {
      let self = this;

      return () => {
          self.time = this.stopwatchService.time();
      };
  }
  */
/*
  lap() {
      this.update();

      if (this.time) {
          this.stopwatchService.lap();
      }
  }
*/

riderToString(rider: Rider){
    console.log ('fff');
    return (rider == null ? 'PARTENZA' : (rider.lastName + ' ' + rider.firstName));
}


getLastFullTime(intervalRelevationNumber: number){
    return this.stopwatchService.lastIntervalFullTime(intervalRelevationNumber);
}

getLastRecordedTime(){
    return this.stopwatchService.getLastRecordedTime();
}

recordTimeLap(rider: Rider){
    console.log('1');
    this.update();
    console.log('2');
    if (this.started) {
        this.stopwatchService.recordTimeIntermediate(rider);
    } 
    console.log('3');
    
}

  reset() {
      this.stopwatchService.reset();
      this.started = false;
      this.update();
  }

  start() {
      //this.timer = setInterval(this.getUpdate(), 1);
      this.stopwatchService.start();
      this.started = true;
  }

  stop() {
      clearInterval(this.timer);
      this.stopwatchService.stop();
  }

  toggle() {
      if (this.started) {
          this.stop();
      } else {
          this.start();
      }

      this.started = !this.started;
  }

  update() {
      console.log('update');
      //this.time = this.stopwatchService.time();
  }

  onClick() {
      console.log(this.stopwatchService);
  }
}
