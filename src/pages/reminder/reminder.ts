import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { trigger } from '@angular/core/src/animation/dsl';

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
    console.log('ionViewDidLoad ReminderPage');
  }

  goToHomePage() {
    this.test();
    this.setNotice();
    this.navCtrl.push(TabsPage);
    //this.presentToast();
  }

  /*async presentToast() {
    const toast = await this.toastController.create({
      message: this.myDate,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }*/

  test(){
    this.localNotifications.schedule({
      title: 'Measurements reminder',
      text: 'It\'s time to take mesurements!',
      actions: [
        { id: 'close', title: 'Close'}
      ],
      trigger: {at: new Date(new Date().getTime())}
    });
  }

  setNotice(){
    if(this.alert=='ringtone'){
      this.localNotifications.setDefaults({vibrate: false,
        sound: 'file://sound.mp3'});
    } else{
      this.localNotifications.setDefaults({vibrate: true})
    }

    if(this.repeat=='daily'){
      this.localNotifications.schedule({
        title: 'Measurements reminder',
        text: 'It\'s time to take mesurements!',
        actions: [
          { id: 'close', title: 'Close'}
        ],
        trigger: {at: this.myDate, 
          every: {hour: parseInt(this.myDate.substring(0,2)), 
            minute: parseInt(this.myDate.substring(3,5))}}
      });
    }else{
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
}
