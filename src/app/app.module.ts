import { BrowserModule          } from '@angular/platform-browser';
import { NgModule               } from '@angular/core';
import { FormsModule            } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes   } from '@angular/router';

import { ChartModule }            from 'angular2-chartjs';

import { AppComponent           } from './app.component';
import { RiderDetailComponent   } from './components/rider-detail.component';
import { ConfigurationComponent } from './components/configuration.component';
import { NavigationComponent    } from './components/navigation.component';
import { HomeComponent          } from './components/home.component'
import { TrackerComponent       } from './components/tracker.component'
import { StatsComponent         } from './components/stats.component'

import { SimplifiedStopwatchService} from './services/simplified-stopwatch.service'




const appRoutes: Routes = [
  { path: '',               redirectTo: 'home',                 pathMatch: 'full'   },
  { path: 'home',           component: HomeComponent                                },
  { path: 'configuration',  component: ConfigurationComponent                       },
  { path: 'tracker',        component: TrackerComponent                             }

  /*,{ path: '**', component: PageNotFoundComponent }*/
];




@NgModule({
  declarations: [
    AppComponent,
    RiderDetailComponent,
    ConfigurationComponent,
    NavigationComponent,
    HomeComponent,
    TrackerComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    ChartModule
  ],
  providers: [SimplifiedStopwatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
