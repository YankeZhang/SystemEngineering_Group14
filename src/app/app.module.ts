import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Config } from 'ionic-angular';
import { Hampton} from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { PressurePage } from '../pages/pressure/pressure';
import { GlucosePage } from '../pages/glucose/glucose';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ReminderPage } from '../pages/reminder/reminder';
import { DetailPage}  from '../pages/detail/detail';
import { ContactDetailsPage }  from '../pages/contact-details/contact-details'
import { BluetoothPage } from '../pages/bluetooth/bluetooth';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ReminderPageModule } from '../pages/reminder/reminder.module';

import { ChartsModule } from 'ng2-charts'
import { BLE } from '@ionic-native/ble';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

const firebase = {
  apiKey: "AIzaSyA9Nk5GHK0euIxAYKPY23sYHVCIItM6QY8",
  authDomain: "ionicproject-f7802.firebaseapp.com",
  databaseURL: "https://ionicproject-f7802.firebaseio.com",
  projectId: "ionicproject-f7802",
  storageBucket: "ionicproject-f7802.appspot.com",
  messagingSenderId: "979453945585"
}

@NgModule({
  declarations: [
    Hampton,
    LoginPage,
    BluetoothPage,
    PressurePage,
    GlucosePage,
    HomePage,
    TabsPage,
    DetailPage,
    ReminderPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Hampton),
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ChartsModule,
    //LocalNotifications
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Hampton,
    LoginPage,
    ReminderPage,
    BluetoothPage,
    PressurePage,
    GlucosePage,
    HomePage,
    DetailPage,
    TabsPage
  ],
  providers: [
    BLE,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    BluetoothLE
  ]
})
export class AppModule {}
