import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RiderDetailComponent } from './components/rider-detail.component';
import { ConfigurationComponent } from './components/configuration.component';


const appRoutes: Routes = [
  { path: 'configuration', component: ConfigurationComponent }
  /*,{ path: '**', component: PageNotFoundComponent }*/
];




@NgModule({
  declarations: [
    AppComponent,
    RiderDetailComponent,
    ConfigurationComponent
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
