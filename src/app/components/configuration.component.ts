import { Component } from '@angular/core';


import {Rider} from '../models/rider.model';
import {RIDERS} from '../mocks/riders.mock';



@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})

export class ConfigurationComponent {
  selectedRider: Rider;
  riders = RIDERS;

  onSelect(rider: Rider): void {
    this.selectedRider = rider;
  }
}
