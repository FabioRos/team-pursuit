import { Component, Input } from '@angular/core';

import {Rider} from '../models/rider.model';
import {RIDERS} from '../mocks/riders.mock';
import {TimeRecord} from '../models/time-record.model'
import { SimplifiedStopwatchService} from '../services/simplified-stopwatch.service'


//TODO import chart
//https://www.npmjs.com/package/angular2-chartjs

@Component({
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  selector: 'stats'
})



export class StatsComponent  {
  @Input() lastParentEditTimestamp: number;
  
  
  
  private dataSet: Number[];
  private labels:  String[];


  constructor(public stopwatchService: SimplifiedStopwatchService){
    this.reset();
  }

  ngOnChanges(changes) {
    this.buildDataset();
  }

 


  reset(){
    this.dataSet = [];
    this.labels = [];
    if(this.stopwatchService.timeRecords!= null && this.stopwatchService.timeRecords.length > 0){
      this.buildDataset();
    }
  }

  buildDataset(){
    debugger
    this.reset();
    for (var i=0; i < this.stopwatchService.timeRecords.length; i++){
      this.labels[i] = this.stopwatchService.timeRecords[i].rider.toString();
      this.dataSet[i] = this.stopwatchService.timeRecords[i].lap.time();
    }
  }


}