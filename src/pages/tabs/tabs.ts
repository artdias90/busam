import { Component } from '@angular/core';

import { StartPage } from '../start/start';
import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StartPage;
  tab2Root: any = AboutPage;
  tab3Root: any = ProfilePage;

  constructor() {

  }
}
