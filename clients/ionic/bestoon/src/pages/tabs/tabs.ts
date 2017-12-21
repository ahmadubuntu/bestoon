import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { SettingsPage } from '../settings/settings';
import { IncomePage } from '../income/income';
import { ExpensePage } from '../expense/expense';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExpensePage;
  tab3Root = IncomePage;
  tab4Root = SettingsPage
  tab5Root = ContactPage;

  constructor() {

  }
}
