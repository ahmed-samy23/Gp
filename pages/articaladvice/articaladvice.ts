import { article_advice } from './../../Models/article_advice';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ArticaladvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articaladvice',
  templateUrl: 'articaladvice.html',
})
export class ArticaladvicePage {
  name:string;
  title:string;
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl: LoadingController
              ,private alertCtrl:AlertController,private http:Http) {
    this.name = this.navParams.get('name');
    this.title =this.navParams.get('title');
    console.log(this.name)
    console.log(this.title)
    this.loader.present();
    this.allarticle();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticaladvicePage');
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  //============================== looding children data=============================
  allarticleadvices:article_advice[]=[];
  articles:article_advice[]=[];
  allarticle(){
    try {
      this.http.get(SERVER_IP + 'article_advice')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) =>  {
          for(var key in data){
          var temp:article_advice = data[key];
          this.allarticleadvices.push(temp);
        }
        console.log('=======> this.allarticaladvices');
        console.log(this.allarticleadvices);
        this.allarticleadvices.forEach(c => {
          if(this.name == c.type){
            this.articles.push(c);
          }
        });
        console.log('=======> this.articles');
        console.log(this.articles);
        this.loader.dismiss();
        }
      );
    } catch (error) {
      this.showAlertError();
      this.loader.dismiss();
      console.log(error);
    }
  }

}
