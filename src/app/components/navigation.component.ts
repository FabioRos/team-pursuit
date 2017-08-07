import {Component } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute, NavigationStart } from '@angular/router';

import {Page} from '../models/page.model';
import {PAGES} from '../constants/pages.constants';
import 'rxjs/add/operator/filter';



@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
  selectedPage: Page;
  pages :Page[];

  onSelect(page: Page): void {
    this.selectedPage = page;
  }






  constructor(router:Router){
  //  this.selectedPage= PAGES[0]; //route.params.snapshot];
    this.pages = PAGES;

    router.events
   .filter(event => event instanceof NavigationStart)
   .subscribe((event:NavigationStart) => {
     // You only receive NavigationStart events
     //event["url"] // --> "/configuration"
     for (var i=0; i < PAGES.length; i++) {
         if (PAGES[i].path === event["url"]) {
             this.selectedPage=PAGES[i];
         }
     }
   });
  }

  search(nameKey, myArray){

  }

}
