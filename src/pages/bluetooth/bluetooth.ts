import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DetailPage } from '../detail/detail';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html'
})
export class BluetoothPage {
  devices: any[] = [];
  statusMessage: string;
  constructor(public navCtrl: NavController, 
    private toastCtrl: ToastController,
    //private bluetoothle: BluetoothLE,
    private ble: BLE,
    private ngZone: NgZone,
    public plt: Platform
    ) {
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();

  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([],5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );
    
    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }


  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      if(device.name!=null)
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    this.navCtrl.push(ContactPage, {
      device: device
    });
  }
}
