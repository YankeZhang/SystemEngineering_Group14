import { Component,NgZone } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  glucose: String='';
  peripheral: any = {};
  statusMessage: string;
  recordTime: string;
  device = null;
  current:number=null;
  currentTime: string;
  chartLabels=[];
  chartData=[];
  chartType:string = 'line';
  constructor( private ble: BLE,
    private toastCtrl: ToastController,
    private ngZone: NgZone,public navCtrl: NavController, public firedb: AngularFireDatabase,public fire:AngularFireAuth, public navParams: NavParams, public alertCtrl:AlertController) {
    let device = navParams.get('device');
    this.initializeDatabase();
    if(device!=null)
    {
      this.setStatus('Connecting to ' + device.name || device.id);
      this.ble.autoConnect(device.id,this.onConnected.bind(this),this.onDeviceDisconnected.bind(this));
      this.ble.connect(device.id).subscribe(
        peripheral => this.onConnected(peripheral),
        peripheral => this.onDeviceDisconnected(peripheral)
      );
      this.onConnected(this.peripheral);
    }
  }
  onConnected(peripheral)
  {
    this.peripheral=peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
    this.ble.startNotification(this.peripheral.id, '1808', '2a18',).subscribe(
      data => this.onChange(data),
    )
    this.send();
  }

  send() {
    let data = new Uint8Array(2);
    data[0]=0x01;
    data[1]=0x05;
    this.ble.write(this.peripheral.id, "1808", '2a52', data.buffer).then(
      () => this.setStatus('requiring access: ' + data.toString())
      //e => this.showAlert('Unexpected Error', 'Error updating dimmer characteristic ' + e)
    );
  }

  onChange(buffer:ArrayBuffer) {
    let intData=new Uint8Array(buffer);
    this.ngZone.run(() => {
      this.glucose=(intData[12]/18).toFixed(1)+"mmol/l";
      this.current=Number((intData[12]/18).toFixed(1))
      this.recordTime=intData[5].toString()+"/"+intData[6].toString()+" "+intData[7].toString()+":"+intData[8].toString();
    });
  }

  onDeviceDisconnected(peripheral) {
    let toast = this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
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
          this.chartData=_data;
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
        if(this.current>7||this.current<4){
          const alert = this.alertCtrl.create({
            title: 'Contact doctors',
            subTitle: 'Your blood glucose measurement is out of the normal range, please measure it again or contact your doctor for help.',
            buttons: [{text: 'OK'}, {text: 'Doctor Details', handler: () =>{this.navCtrl.push("ContactDetailsPage")}}]
          });
          alert.present();
        }
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
