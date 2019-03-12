import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  final;
  intdata;
  floatdata;
  datas=[];
  peripheral: any = {};
  statusMessage: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private ble: BLE,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private ngZone: NgZone
              ) {

    let device = navParams.get('device');

    this.setStatus('Connecting to ' + device.name || device.id);

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    );
  }

  // onConnected(peripheral) {
  //   this.ngZone.run(() => {
  //     this.setStatus('');
  //     this.peripheral = peripheral;
  //   });

  //   this.ble.read(this.peripheral.id,'180a','2a26').then(
  //     buffer => {
  //       let intData=new Uint8Array(buffer);
  //       let floatData=new Float32Array(buffer);
  //       this.ngZone.run(() => {
  //         for(var n=0;n<intData.length;n++)
  //         {
  //           this.datas.push(intData[n])
  //         }
  //         this.floatdata=floatData[0];
  //       })
  //     }
  //   )
  // }

  onConnected(peripheral)
  {
    this.peripheral=peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
    
    this.ble.startNotification(this.peripheral.id, '1808', '2a18').subscribe(
      data => this.onChange(data),
    )
  }

  send() {
    let buffer = new Uint8Array(2).buffer;
    // buffer[0]=0x01;
    // buffer[1]=0x01;
    this.datas.push(0x0101);
    this.ble.write(this.peripheral.id, '1808', '2a52', buffer).then(
      () => this.setStatus('requiring access' + '0x0101')
      //e => this.showAlert('Unexpected Error', 'Error updating dimmer characteristic ' + e)
    );
  }

  onChange(buffer:ArrayBuffer) {
    let intData=new Uint8Array(buffer);

    this.ngZone.run(() => {
      for(var n=0;n<intData.length;n++)
          {
            this.datas.push(intData[n])
          }
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