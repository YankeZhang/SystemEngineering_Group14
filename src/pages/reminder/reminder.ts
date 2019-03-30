import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the ReminderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {
  myDate;
  repeat;
  alert;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private localNotifications: LocalNotifications,
    private toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDdLoad ReminderPage');
  }

  goToHomePage() {
   
    this.presentToast();
    this.setNotice();
    this.navCtrl.pop();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.myDate,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  timeSetting(){
    
  }

  setNotice(){
    this.localNotifications.schedule({
      title: 'Measurements reminder',
      text: 'It\'s time to take mesurements!',
      actions: [
        { id: 'close', title: 'Close'}
      ],
      trigger: {at: this.myDate}
    });
   
  }
 
}
