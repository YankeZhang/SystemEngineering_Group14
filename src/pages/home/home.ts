import { Component, Testability } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  test: Testability;
  constructor(private fire:AngularFireAuth,public navCtrl: NavController,public app: App) {

  }

  isRound: boolean = true;
  isFull: boolean = true;

  text: string = "Last Recorded time: "+ "19";

  signOut()
  {
    const root = this.app.getRootNav();
    this.fire.auth.signOut;
    root.popToRoot();
  }

}
