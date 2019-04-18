import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PressurePage } from '../pressure/pressure';
import { GlucosePage } from '../glucose/glucose';
import { HomePage } from '../home/home';
import { BluetoothPage } from '../bluetooth/bluetooth';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PressurePage;
  tab3Root = GlucosePage;
  tab4Root = BluetoothPage;

  constructor(public navCtrl: NavController) {

  }
}
