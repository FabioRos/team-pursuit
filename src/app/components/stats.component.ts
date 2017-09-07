import { Component, Input, ViewChild} from '@angular/core';

import {Rider} from '../models/rider.model';
import {RIDERS} from '../mocks/riders.mock';
import {TimeRecord} from '../models/time-record.model'
import { SimplifiedStopwatchService} from '../services/simplified-stopwatch.service'
import { ChartComponent } from 'angular2-chartjs';


//TODO import chart
//https://www.npmjs.com/package/angular2-chartjs

@Component({
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  selector: 'stats'
})



export class StatsComponent {
  @Input() lastParentEditTimestamp: number;
  @ViewChild(ChartComponent) chart: ChartComponent; 
  
  //https://github.com/emn178/angular2-chartjs/blob/master/dev/app.component.ts
  
  type = 'line';
  data = {
    labels: [],
    datasets: [
      {
        label: "My First dataset",
        data: []
      }
    ]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  

  constructor(public stopwatchService: SimplifiedStopwatchService){
    this.reset();
  }

  reset(){
    if(this.stopwatchService.timeRecords!= null && this.stopwatchService.timeRecords.length > 0){
      this.data = {
        labels: [],
        datasets: [
          {
            label: "My First dataset",
            data: []
          }
        ]
      };
    }
  }

  refreshAllVariables() {
    console.log('CHANGE');
    var data = this.buildDataset();
    this.refreshChart(data.labels, data.dataset);
  }

  buildDataset(){
    console.log('BUILD DATASET');
    this.reset();
    var labels = [];
    var dataset = [];
    for (var i=0; i < this.stopwatchService.timeRecords.length; i++){
      labels.push(this.stopwatchService.timeRecords[i].rider.toString());
      dataset[i] = this.stopwatchService.timeRecords[i].lap.time();
    }
    return {labels: labels, dataset: dataset};
  }

  refreshChart(labels: String[], dataset: Number[]) {
    console.log('RC');
    this.data = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          data: dataset
        }
      ]
    };
   // 
    
  }


  


  //-----------------------------------------------------------------------------------------------------------
  
  interval: any;
  ngOnInit(){
  this.interval = setInterval(() => {
       this.refreshAllVariables() ;
       this.chart.chart.update();
   }, 5000);
  }

   ngOnDestroy() {
   if (this.interval) {
       clearInterval(this.interval);
   }
  }


}