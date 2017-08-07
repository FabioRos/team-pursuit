import { Component } from '@angular/core';
import { ConfigurationComponent} from './components/configuration.component'
import { NavigationComponent} from './components/navigation.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gestore Quartetto';
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
