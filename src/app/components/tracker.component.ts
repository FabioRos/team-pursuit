import { Component } from '@angular/core';


import {Rider} from '../models/rider.model';
import {RIDERS} from '../mocks/riders.mock';



@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})

export class TrackerComponent {
  //selectedRider: Rider;
  riders = RIDERS;

  //onSelect(rider: Rider): void {
  //  this.selectedRider = rider;
  //}
}
