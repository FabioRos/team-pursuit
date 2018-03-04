import { Component, Input, ViewChild} from '@angular/core';

import {Rider} from '../models/rider.model';
import {RIDERS} from '../mocks/riders.mock';
import {TimeRecord} from '../models/time-record.model'
import { SimplifiedStopwatchService} from '../services/simplified-stopwatch.service'
import { ChartComponent } from 'angular2-chartjs';
import { TrackerComponent } from './tracker.component';


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
        data: [],
        pointBackgroundColor: [],
        borderColor: [],
        pointBorderColor: []
      }
    ]
  };

  options = {
    responsive: true,
    maintainAspectRatio: true,
    elements: { // In that way I obtain straight lines
      line: {
          tension: 0
      }
    },    
    animation: {
      duration: 0
    }, 
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
          label: function(tooltipItems, data) { 
              var deltaPercetageString_: string = '';
              if(tooltipItems.index>0){
                var previousValue_: number= this._data.datasets[0].data[tooltipItems.index-1];
                var delta: number= (tooltipItems.yLabel - previousValue_);
                var deltaPercetage_: number= ((delta)/previousValue_ )*100;
                var deltaPercetageString_: string= (delta > 0 ? '+' : '')  + deltaPercetage_.toFixed(2) + '%'; 
              }
              return [tooltipItems.yLabel/1000 +' secondi', deltaPercetageString_, StatsComponent.formatTime(delta)] ;
          }
      }
  },
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
          data: [],
          pointBackgroundColor: [],
          borderColor: [],
          pointBorderColor: []
        }
      ]
    };
  }

  refreshAllVariables() {
    console.log('CHANGE');
    var data = this.buildDataset();
    this.refreshChart(data.labels, data.dataset, data.pointBackgroundColor, data.borderColor, data.pointBorderColor);
  }

  buildDataset(){
    console.log('BUILD DATASET');
    this.resetChart();
    var labels = [];
    var dataset = [];
    var pointBackgroundColor_ = []
    var borderColor_ = []
    var pointBorderColor_ = []
    var color_: string;
    for (var i=0; i < this.localTimeRecordsCopy.length; i++){
      if(i==0){
        color_ = 'blue'
      }else{
        color_ = ((this.localTimeRecordsCopy[i].deltaTime <= 0) ? 'green' : 'red')
      }
      labels.push(this.localTimeRecordsCopy[i].rider.lastName + ' ' + this.localTimeRecordsCopy[i].rider.firstName);
      dataset.push(this.localTimeRecordsCopy[i].lap.time());
      pointBackgroundColor_.push(color_);
      borderColor_.push(color_);
      pointBorderColor_.push(color_);
    }
    return {labels: labels, dataset: dataset, pointBackgroundColor: pointBackgroundColor_, borderColor: borderColor_, pointBorderColor: pointBorderColor_};
  }

  refreshChart(labels: String[], dataset: Number[], pointBackgroundColor_: String[], borderColor_: String[], pointBorderColor_: String[]) {
    console.log('RC');
    this.data = {
      labels: labels,
      datasets: [
        {
          label: "Andamento dei tempi",
          data: dataset,
          pointBackgroundColor: pointBackgroundColor_,
          borderColor: borderColor_,
          pointBorderColor: pointBorderColor_
        }
      ]
    };
   // 
    
  }


  static formatTime(timeIntervalMs): string{
    let minutes: string,
        seconds: string,
        milliseconds: string;
      seconds = Math.floor(Math.abs(timeIntervalMs / 1000)).toString();
      milliseconds = Math.floor(Math.abs(timeIntervalMs % 1000)).toString();
      
      return (timeIntervalMs > 0 ? '+' : '-') + seconds + '.' + milliseconds + 'secondi';
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