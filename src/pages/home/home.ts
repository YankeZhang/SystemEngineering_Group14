import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private fire:AngularFireAuth,public navCtrl: NavController,public app: App) {

  }

  signOut()
  {
    const root = this.app.getRootNav();
    this.fire.auth.signOut;
    root.popToRoot();
  }
}
