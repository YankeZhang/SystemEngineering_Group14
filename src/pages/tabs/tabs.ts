import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BloodpressurePage } from '../bloodpressure/bloodpressure';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { BluetoothPage } from '../bluetooth/bluetooth';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BloodpressurePage;
  tab3Root = ContactPage;
  tab4Root = BluetoothPage;

  constructor(public navCtrl: NavController) {

  }
}
