import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	currentUser = null;
  @ViewChild('username') uname;
  @ViewChild('password') password;
  constructor(public fire:AngularFireAuth,public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  signIn()
  {
    console.log(this.uname.value, this.password.value);
    this.fire.auth.signInWithEmailAndPassword(this.uname.value,this.password.value).then(data =>{
      this.currentUser=this.uname;
      this.navCtrl.push(TabsPage);
    })
    .catch( error =>
      {
        const wronginfoalert = this.alertCtrl.create({
      		title: 'Login fail!',
      		subTitle: 'You entered wrong username or password, try again!',
      		buttons: ['OK']
    	});
      wronginfoalert.present();
      }
    )
  }

}
