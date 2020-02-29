import { artical } from './../../Models/artical';
import { doctor } from './../../Models/doctor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DoctorArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-article',
  templateUrl: 'doctor-article.html',
})
export class DoctorArticlePage {
ar:artical=new artical();
mydoc:doctor=new doctor();
myartical:{a:artical,photo:boolean};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ar=this.navParams.get('ar');
    this.mydoc = this.navParams.get('mydoc');
    console.log(this.ar);
    this.mappingphoto();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorArticlePage');
  }
mappingphoto(){
  if(this.ar.photo != null && this.ar.photo != undefined && this.ar.photo != ''){
    var at:{a:artical,photo:boolean}={a:this.ar , photo:true};
    this.myartical = at;
    console.log('with photo');
    console.log(this.myartical);
  }else{
    var at2:{a:artical,photo:boolean}={a:this.ar , photo:false};
    this.myartical = at2;
    console.log('without photo');
    console.log(this.myartical);
  }
}
}
