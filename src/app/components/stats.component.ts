import { Component, Input, ViewChild} from '@angular/core';

import {Rider} from '../models/rider.model';
import {RIDERS} from '../mocks/riders.mock';
import {TimeRecord} from '../models/time-record.model'
import { SimplifiedStopwatchService} from '../services/simplified-stopwatch.service'
import { ChartComponent } from 'angular2-chartjs';


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
        label: "Andamento dei tempi",
        data: []
      }
    ]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: { // In that way I obtain straight lines
      line: {
          tension: 0
      }
    },    
    animation: {
      duration: 0
    }
  };


  public localTimeRecordsCopy: TimeRecord[];

  constructor(public stopwatchService: SimplifiedStopwatchService){
    this.reset();
  }

  
  resetAll(){
    this.reset();
    this.resetChart();
  }

  reset(){
    this.localTimeRecordsCopy =[];
    this.resetChart();
  }
  resetChart(){
    this.data = {
      labels: [],
      datasets: [
        {
          label: "Andamento dei tempi",
          data: []
        }
      ]
    };
  }

  refreshAllVariables() {
    console.log('CHANGE');
    var data = this.buildDataset();
    this.refreshChart(data.labels, data.dataset);
  }

  buildDataset(){
    console.log('BUILD DATASET');
    this.resetChart();
    var labels = [];
    var dataset = [];
    for (var i=0; i < this.localTimeRecordsCopy.length; i++){
      labels.push(this.localTimeRecordsCopy[i].rider.lastName + ' ' + this.localTimeRecordsCopy[i].rider.firstName);
      dataset.push(this.localTimeRecordsCopy[i].lap.time());
    }
    return {labels: labels, dataset: dataset};
  }

  refreshChart(labels: String[], dataset: Number[]) {
    console.log('RC');
    this.data = {
      labels: labels,
      datasets: [
        {
          label: "Andamento dei tempi",
          data: dataset
        }
      ]
    };
   // 
    
  }


  


  //-----------------------------------------------------------------------------------------------------------
  
//  interval: any;
ngAfterViewInit(){
  /*this.interval = setInterval(() => {
       this.refreshAllVariables() ;
       this.chart.chart.update();
   }, 5000);
   */

    this.stopwatchService.getAllTimeRecords().subscribe(timerecordsData => { 
          this.localTimeRecordsCopy = timerecordsData;
          this.refreshAllVariables(); // <- need to manually trigger redraw, ngOnChanges is not called by the subscription
          this.chart.chart.update();
          
                      
      });

      
  }

   ngOnDestroy() {
   /*if (this.interval) {
       clearInterval(this.interval);
   }
   */
  }


}