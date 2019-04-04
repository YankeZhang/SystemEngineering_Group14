import { Component,ViewChild } from '@angular/core';
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

  @ViewChild('lineCanvas') lineCanvas;
  valueLinesChart: any;
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
    //this.initializeDatabase();
    this.currentUser=this.fire.auth.currentUser.displayName;
  }
  
  updateCharts(data) {
    this.systolicData = data;
    this.valueLinesChart.data.datasets.forEach((dataset) => {
      dataset.data = this.systolicData;
    });
    this.valueLinesChart.update();
  }

  createCharts(data) {
    this.systolicData = data;
    this.valueLinesChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
          labels: this.chartLabels,
          datasets: [
              {
                  label: "My First dataset",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.systolicData,
                  spanGaps: false,
              }
          ]
      }

  })

  }
  ionViewDidLoad()
  {
    
    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/time").valueChanges().subscribe(
      _data =>
      {
        var i=_data.length;
        this.chartLabels=_data;
        // if(i>=7){
        //   chartLabels=[_data[i-7],_data[i-6],_data[i-5],_data[i-4],_data[i-3],_data[i-2],_data[i-1]];
        // }
        // else if(i!=0)
        // {
        //   chartLabels=_data;
        // }
      }
    )
    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/record/systolic").valueChanges().subscribe(
      _data =>
      {
        if (this.systolicData) {
          this.updateCharts(_data)
        } else {
          this.createCharts(_data)
        }
        // if(i>=7){
        //   systolicData=[_data[i-7],_data[i-6],_data[i-5],_data[i-4],_data[i-3],_data[i-2],_data[i-1]];
        // }
        // else if(i!=0)
        // {
        //   systolicData=_data;
        // }
      }
    )

    this.firedb.list("/users/"+this.fire.auth.currentUser.email.split('.').join('')+"/bloodpressure/record/diastolic").valueChanges().subscribe(
      _data =>
      {
        var i=_data.length;
        this.diastolicData=_data        
        // if(i>=7){
        //   diastolicData=[_data[i-7],_data[i-6],_data[i-5],_data[i-4],_data[i-3],_data[i-2],_data[i-1]];
        // }
        // else if(i!=0)
        // {
        //   diastolicData=_data;
        // }
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
