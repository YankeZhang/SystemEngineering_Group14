import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Color } from 'ng2-charts';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  
  currentUser;
  systolic:number=null;
  diastolic:number=null;
  currentTime: string;
  chartLabels=[];
  systolicData=[];
  diastolicData=[];
  public lineChartLegend = false;
  chartType:string = 'line';

  //public lineChartData = this.systolicData;

  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];

  
  chartOptions: {
    scales: {
      yAxes: [{
          ticks: {
              max: 106,
              min: 94,
              stepSize: 1
          }
      }]
    }
  }

  constructor(public navCtrl: NavController, public firedb: AngularFireDatabase,public fire: AngularFireAuth) {
    this.initializeDatabase();
    this.currentUser=this.fire.auth.currentUser.displayName;
  }

  initializeDatabase()
  {
    
    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/time").valueChanges().subscribe(
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
    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/record/systolic").valueChanges().subscribe(
      _data =>
      {
        var i=_data.length;        
        if(i>=7){
          this.systolicData=[_data[i-7],_data[i-6],_data[i-5],_data[i-4],_data[i-3],_data[i-2],_data[i-1]];
        }
        else if(i!=0)
        {
          this.systolicData=_data;
        }
      }
    )

    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/record/diastolic").valueChanges().subscribe(
      _data =>
      {
        var i=_data.length;        
        if(i>=7){
          this.diastolicData=[_data[i-7],_data[i-6],_data[i-5],_data[i-4],_data[i-3],_data[i-2],_data[i-1]];
        }
        else if(i!=0)
        {
          this.diastolicData=_data;
        }
      }
    )
    

  }

  uploadpressure()
  {
    if(this.systolic!=null&&this.diastolic!=null)
      {
        this.getCurrentTime();
        this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/record/systolic").push(Number(this.systolic));
        this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/record/diastolic").push(Number(this.diastolic));
        this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/time").push(this.currentTime);
      }
    console.log(this.systolicData);
  }

  getCurrentTime()
  {
    var date=new Date();
    var day=date.getDate().toString();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    this.currentTime=day+"/"+hour+":"+minute;
  }
}
