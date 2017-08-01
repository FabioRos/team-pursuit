import { Component, Input } from '@angular/core';

import {Rider} from '../models/rider.model';
import {RIDERS} from '../mocks/riders.mock';


@Component({
  templateUrl: './rider-detail.component.html',
  styleUrls: ['./rider-detail.component.css'],
  selector: 'rider-detail',
})



export class RiderDetailComponent {
  @Input() rider: Rider;
}
