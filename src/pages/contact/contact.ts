import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
declare var google;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  device = null;
  current: number=null;
  currentTime: string;
  chartLabels=[];
  chartData=[];
  chartType:string = 'line';
  constructor(public navCtrl: NavController, public firedb: AngularFireDatabase,public fire:AngularFireAuth, public navParams: NavParams) {
    let device = navParams.get('device');
    this.initializeDatabase();
  }

  initializeDatabase()
  {
    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodglucose/time").valueChanges().subscribe(
      _data =>
      {
        var i=_data.length;
        if(i>=7){
          this.chartLabels=[_data[i-7],_data[i-6],_data[i-5],_data[i-4],_data[i-3],_data[i-2],_data[i-1]];
        }
        else if(i!=0)
        {
          this.chartLabels=_data;
        }
      }
    )
    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodglucose/record").valueChanges().subscribe(
      _data =>
      {
        var i=_data.length;        
        if(i>=7){
          this.chartData=[_data[i-7],_data[i-6],_data[i-5],_data[i-4],_data[i-3],_data[i-2],_data[i-1]];
        }
        else if(i!=0)
        {
          this.chartLabels=_data;
        }
      }
    )
  
  }

  uploadglucose()
  {
    if(this.current!=null)
      {
        this.getCurrentTime();
        this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodglucose/record").push(Number(this.current));
        this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodglucose/time").push(this.currentTime);
      }
  }

  getCurrentTime()
  {
    var date = new Date();
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    this.currentTime = day+"/"+hour+":"+minute;
  }
}
