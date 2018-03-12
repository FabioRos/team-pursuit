import { Component, Input} from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
declare var jsPDF: any; 

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

  public formatTime(timeMs: number) {
      let minutes: string,
          seconds: string,
          milliseconds: string;

      minutes = Math.floor(timeMs / 60000).toString();
      seconds = Math.floor(Math.abs((timeMs % 60000) / 1000)).toString();
      milliseconds = Math.floor(Math.abs((timeMs % 60000) % 1000)).toString();
      
      return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds + ':' + milliseconds;
  }

  public formatTimeIntervalAboutSeconds(timeMs: number) {
    let seconds: string,
        milliseconds: string;

    seconds = Math.floor(Math.abs(timeMs/ 1000)).toString();
    milliseconds =  Math.floor(Math.abs(timeMs % 1000)).toString();
    
    return  seconds + ':' + milliseconds;
}
    
  
riderToString(rider: Rider){
    //console.log ('fff');
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

  downloadPDF(){
    var timestamp: number= (new Date()).getTime();
    const doc= new jsPDF();
    var now: Date= new Date(timestamp);
    doc.text('EXPORT QUARTETTO ' + now.toLocaleString(), 10, 10);

    var columns=['Atleta', 'Intertempo', 'Progressivo', 'delta (tempo)', ' delta (%)'];
    var rows=[];
    for (var i=0; i < this.localTimeRecordsCopy.length; i++){
        var current_record_array = []
        var current_record_: TimeRecord = this.localTimeRecordsCopy[i];
        current_record_array.push(current_record_.rider.lastName + ' '+ current_record_.rider.firstName);
        current_record_array.push( this.formatTime(current_record_.lap.time()));
        var fullTimeAtThisLap: number = 0
        for(var j=0; j <= i; j++){
            fullTimeAtThisLap += this.localTimeRecordsCopy[j].lap.time();
        }
        current_record_array.push(this.formatTime(fullTimeAtThisLap));
        current_record_array.push( i==0 ? '' : this.formatTimeIntervalAboutSeconds(current_record_.deltaTime));
        current_record_array.push( i==0 ? '' : current_record_.deltaPercentage.toFixed(2) );
        rows.push(current_record_array);
      }
    doc.autoTable(columns, rows);
    doc.save('EXPORT QUARTETTO [ ' + now.toLocaleString() + ' ].pdf');


  }

ngOnInit(){
      this.stopwatchService.getAllTimeRecords().subscribe(timerecordsData => { 
            this.localTimeRecordsCopy = timerecordsData;
        });
    }

}
