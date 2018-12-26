import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginPage } from '../login/login';

declare var google;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  current: number=null;

  constructor(public navCtrl: NavController, private firedb: AngularFireDatabase ) {
    
  }

  uploadpressure()
  {
    this.firedb.list("/bloodpressure/").push(this.current);
  }

  drawChart()
  {
    var data = google.visualization.arrayToDataTable([
      ['time', 'user'],
      ['2004',  100  ],
      ['2005',  110  ],
      ['2006',  98   ],
      ['2007',  94  ]
    ]);

    var options = {
      title: 'Blood pressure',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }
}
