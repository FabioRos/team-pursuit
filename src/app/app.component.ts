import { Component } from '@angular/core';


import {Rider} from './models/rider.model';
import {RIDERS} from './mocks/riders.mock';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gestore Quartetto';
  selectedRider: Rider;
  riders = RIDERS;

  onSelect(rider: Rider): void {
    this.selectedRider = rider;
  }
}















/*

@Component({
  selector: 'configuration',
  templateUrl: '../view/templates/configuration.html'
})
export class ConfigurationComponent {

  velodromeLength :number;
  startingSectionLength :number;

  riders: Rider[];

  constructor(){
    this.velodromeLength = 400;
    this.startingSectionLength = 250;
    this.riders = RIDERS;
  }
}
*/
