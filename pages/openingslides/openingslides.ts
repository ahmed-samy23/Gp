import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the OpeningslidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-openingslides',
  templateUrl: 'openingslides.html',
})
export class OpeningslidesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpeningslidesPage');
  }
  
  getstart(){
    let loader = this.loadingCtrl.create({
      content: "...من فضلك انتظر",
      duration: 10000
    });
    loader.present();
    this.navCtrl.setRoot('RegisterPage');
    loader.dismiss();
  }

}
