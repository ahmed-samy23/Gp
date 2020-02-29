import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { articles_category } from '../../Models/articles_category';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';

/**
 * Generated class for the ListDoctorArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-doctor-article',
  templateUrl: 'list-doctor-article.html',
})
export class ListDoctorArticlePage {
allarticlecat:articles_category[]=[];
loader = this.loadingCtrl.create({
  content: "Please wait...",
  duration: 10000
});
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private menuCtrl:MenuController
                ,private loadingCtrl:LoadingController) {
    menuCtrl.enable(true);
    this.loader.present();
    this.getlist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDoctorArticlePage');
  }
  menubutton(){
    this.menuCtrl.open();
  }

  gotodoctorlist(li:articles_category){
this.navCtrl.push('DoctorListPage',li)
  }
//============================= get data ==========================================
  getlist(){
    this.http.get(SERVER_IP+'articles_category')
    .map((response:Response)=>response.json())
    .subscribe(
      (data)=>{
        for(var key in data){
          var temp:articles_category = data[key];
          this.allarticlecat.push(temp);
          }
          console.log('============print allcaat')
          console.log(this.allarticlecat)
          this.loader.dismiss();
      }
    );
  }
}
