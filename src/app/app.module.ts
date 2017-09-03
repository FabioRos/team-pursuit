import { BrowserModule          } from '@angular/platform-browser';
import { NgModule               } from '@angular/core';
import { FormsModule            }   from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes   } from '@angular/router';

import { AppComponent           } from './app.component';
import { RiderDetailComponent   } from './components/rider-detail.component';
import { ConfigurationComponent } from './components/configuration.component';
import { NavigationComponent    } from './components/navigation.component';
import { HomeComponent          } from './components/home.component'
import { TrackerComponent       } from './components/tracker.component'




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
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
