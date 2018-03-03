import { Component, Input} from '@angular/core';
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
  providers: []
  
})

export class TrackerComponent {
  riders = RIDERS;
  @Input() stopwatchService:SimplifiedStopwatchService;

  public started: boolean;
  public stopped: boolean;
  public localTimeRecordsCopy: TimeRecord[];


  //public stopwatchService: SimplifiedStopwatchService;
  //public stopwatchService: StopwatchService;
  public time: number;
  private timer: any;

//  constructor(stopwatchService: StopwatchService) {
  constructor(stopwatchService: SimplifiedStopwatchService) {
      this.stopwatchService = stopwatchService;
      this.time = 0;
      this.started = false;
      this.stopped = false;

      this.localTimeRecordsCopy=[];
  }

  formatTime(timeMs: number) {
      let minutes: string,
          seconds: string;

      minutes = Math.floor(timeMs / 60000).toString();
      seconds = ((timeMs % 60000) / 1000).toFixed(3);
      return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
  }

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
    var timestamp_  = (new Date()).getTime();
    
    if (this.started && !this.stopped){
        this.stopwatchService.recordTimeIntermediate(rider, timestamp_ );     
    }
    
}

  reset() {
      this.stopwatchService.reset();
      this.started = false;
      this.stopped = false;
      this.localTimeRecordsCopy = [];
      
  }

  start() {
      //this.timer = setInterval(this.getUpdate(), 1);
      if (!this.started && !this.stopped){
        this.stopwatchService.start();
        this.started = true;
      }
  }

  stop() {
     // clearInterval(this.timer);
      this.stopwatchService.stop();
      this.stopped = true;
  }

ngOnInit(){
      this.stopwatchService.getAllTimeRecords().subscribe(timerecordsData => { 
            this.localTimeRecordsCopy = timerecordsData;
        });
    }

}
