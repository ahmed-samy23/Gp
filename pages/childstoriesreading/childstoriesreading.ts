import { storiesreading } from './../../Models/storiesreading';
import { SERVER_IP } from './../../Models/connection';
import { stories } from './../../Models/stories';
import { Http, Response } from '@angular/http';
import { child } from './../../Models/child';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ChildstoriesreadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-childstoriesreading',
  templateUrl: 'childstoriesreading.html',
})
export class ChildstoriesreadingPage {
  mychild:child=new child();
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http
            ,private loadingCtrl: LoadingController,private alertCtrl:AlertController) {
    this.mychild = this.navParams.data;
    console.log('=============> my child');
    console.log(this.mychild);
    this.loader.present();
    this.getallwhoreaded();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildstoriesreadingPage');
  }

  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  //=================================
  whoreaded:storiesreading[]=[];
  myreading:storiesreading[]=[];
  found:boolean=false;
  getallwhoreaded(){
    try {
      this.http.get(SERVER_IP +'storiesreading')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp: storiesreading= data[key];
        this.whoreaded.push(temp);
        
        }
        console.log('==============================> whoreaded')
        console.log(this.whoreaded);
        this.whoreaded.forEach(element => {
          if(element.child_id == this.mychild.id){
            this.myreading.push(element);
          }
        });
        console.log('==============================> myreading')
        console.log(this.myreading);
        if(this.myreading.length > 0 ){
          this.found=true;
          this.getallstories();
        }else{
          this.found= false;
          this.loader.dismiss();
        }
      }
    );
    } catch (error) {
      console.log(error)
      this.loader.dismiss();
      this.showAlertError();
    }
  }

  allstories:stories[]=[];
  mystories:stories[]=[];
  getallstories(){
    try {
      this.http.get(SERVER_IP +'stories')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:stories= data[key];
        this.allstories.push(temp);
        
        }
        console.log('==============================> allstories')
        console.log(this.allstories);
        this.allstories.forEach(all => {
          this.myreading.forEach(my => {
            if(all.id == my.story_id){
              this.mystories.push(all);
            }
          });
        });
        console.log('==============================> mystories')
        console.log(this.mystories);
        this.loader.dismiss();
      }
    );
    } catch (error) {
      console.log(error)
      this.loader.dismiss();
      this.showAlertError();
    }
  }


}
