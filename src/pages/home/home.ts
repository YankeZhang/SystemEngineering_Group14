import { Component, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { database } from 'firebase';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(private fire:AngularFireAuth,
    public navCtrl: NavController,
    public app: App,
    private toastController: ToastController,
    public firedb: AngularFireDatabase) { 
      this.lastRecorded();
    }

  systolic;
  diastolic;
  glucose;
  
  signOut()
  {
    const root = this.app.getRootNav();
    this.fire.auth.signOut;
    root.popToRoot();
  }

  goToReminderPage() {
    this.navCtrl.push('ReminderPage');
  } 

  goToContactPage() {
    this.navCtrl.push("ContactDetailsPage");
  }

  lastRecorded() {
    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/record/systolic").valueChanges().subscribe(
      _data =>
      {
        if(_data.length>0){
          this.systolic="Systolic:\n"+_data[_data.length-1].toString();
        }else{
          this.systolic="Systolic:\n"+" no records";
        }
      }
    );

    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/record/diastolic").valueChanges().subscribe(
      _data =>
      {
        if(_data.length>0){
          this.diastolic="Diastolic:\n"+_data[_data.length-1].toString();
        }else{
          this.diastolic="Diastolic:\n"+" no records";
        }
      }
    );

    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodglucose/record").valueChanges().subscribe(
      _data =>
      {
        if(_data.length>0){
          this.glucose="Glucose:\n"+_data[_data.length-1].toString();
        }else{
          this.glucose="Glucose:\n"+" no records";
        }
      }
    );
  }

}
