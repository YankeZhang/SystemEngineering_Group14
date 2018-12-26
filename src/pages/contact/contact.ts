import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  current:number = null;
  constructor(private firedb: AngularFireDatabase,public navCtrl: NavController) {

  }

  uploadglucose()
  {
    this.firedb.list("/bloodglucose/").push(this.current);
  }
}
