import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReminderPage } from '../reminder/reminder'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private fire:AngularFireAuth,
    public navCtrl: NavController,
    public app: App,
    private toastController: ToastController) { }

  isRound: boolean = true;
  isFull: boolean = true;
  text: string = "Last Recorded time: "+ "19";
  
  isAndroid: boolean = true;

  signOut()
  {
    const root = this.app.getRootNav();
    this.fire.auth.signOut;
    root.popToRoot();
  }

  goToReminderPage() {
    this.navCtrl.push(ReminderPage);
  }  

}
