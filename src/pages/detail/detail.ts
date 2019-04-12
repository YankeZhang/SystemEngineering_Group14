import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  
  
  glucose: String;
  peripheral: any = {};
  statusMessage: string;
  recordTime: string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private ble: BLE,
              private toastCtrl: ToastController,
              private ngZone: NgZone
              ) {

    let device = navParams.get('device');

    this.setStatus('Connecting to ' + device.name || device.id);
    this.ble.autoConnect(device.id,this.onConnected.bind(this),this.onDeviceDisconnected.bind(this));
    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    );
    this.onConnected(this.peripheral);
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
      this.glucose=(intData[12]/18).toFixed(1).toString()+"mmol/l";
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




}