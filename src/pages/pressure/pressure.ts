import { Component,ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Color } from 'ng2-charts';

@Component({
  selector: 'page-pressure',
  templateUrl: 'pressure.html'
})
export class PressurePage {

  @ViewChild('lineCanvas') lineCanvas;
  currentUser;
  systolic:number=null;
  diastolic:number=null;
  currentTime: string;
  chartLabels=[];
  systolicData=[];
  diastolicData=[];
  public lineChartLegend = false;
  chartType:string = 'line';

  public lineChartData:Array<any> =[
    {data:this.systolicData, label: 'Systolic'}
  ];
  

  public lineChartColors: Color[] = [
    { 
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public chartOptions: {
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

  constructor(public navCtrl: NavController, public firedb: AngularFireDatabase,public fire: AngularFireAuth, public alertCtrl:AlertController) {
    //this.initializeDatabase();
    this.currentUser=this.fire.auth.currentUser.displayName;
  }
  

  
  
  ionViewDidLoad()
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
        if(this.systolic>=160||this.diastolic>=100){
          const alert = this.alertCtrl.create({
            title: 'Contact doctors',
            subTitle: 'Your blood pressure measurement is out of the normal range, please measure it again or contact your doctor for help.',
            buttons: [{text: 'OK'}, {text: 'Doctor Details', handler: () =>{this.navCtrl.push("ContactDetailsPage")}}]
          });
          alert.present();
        }
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
