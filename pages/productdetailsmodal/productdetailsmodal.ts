import { product } from './../../Models/product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductdetailsmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetailsmodal',
  templateUrl: 'productdetailsmodal.html',
})
export class ProductdetailsmodalPage {
  mypro:product=new product();
  constructor(public navCtrl: NavController, public navParams: NavParams ,private viewctrl:ViewController) {
    this.mypro=this.navParams.data;
    console.log(this.mypro)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsmodalPage');
  }
  dismiss(){
    this.viewctrl.dismiss();
  }

}
