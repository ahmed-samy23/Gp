import { storiesreading } from './../../Models/storiesreading';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { child } from './../../Models/child';
import { stories } from './../../Models/stories';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the StoryscriptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storyscript',
  templateUrl: 'storyscript.html',
})
export class StoryscriptPage {
  mystory:stories = new stories();
  mychild:child = new child();
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  allreadinglist:storiesreading[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl: LoadingController,private http:Http
    ,private alertCtrl:AlertController) {
    this.mystory = this.navParams.get('mystory');
    this.mychild = this.navParams.get('c');
    this.allreadinglist=this.navParams.get('allreadinglist')
    console.log('======================== data sending ====================');
    console.log(this.mychild);
    console.log(this.mystory);
    console.log(this.allreadinglist);
    this.loader.present();
    this.ifreadingbefore();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryscriptPage');
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  ifreadingbefore(){
    var count:number = 0;
    this.allreadinglist.forEach(element => {
      if((element.child_id == this.mychild.id)){
        if((element.story_id == this.mystory.id)){
        console.log('inf for each story id')
        console.log(element.story_id);
        console.log(this.mystory.id)
        count++;
      }
    }
    });
    if(count == 0){
      this.savereading();
    }else{
      console.log('reading before');
      this.map();
      this.loader.dismiss();
    }
  }
  savereading(){
    var c:Response;
    var r:storiesreading=new storiesreading();
    r.story_id = this.mystory.id;
    r.child_id = this.mychild.id;
    console.log('the obj to send');
    console.log(r);
    try {
      this.http.post(SERVER_IP +'storiesreading', r)
    .subscribe(
      (data) =>{
        c = data
        console.log('========> el response ')
        console.log(c)
        if(c.status == 201 ){
          this.map();
          this.loader.dismiss();
        }
      } 
    );
    } catch (error) {
      console.log(error);
      this.loader.dismiss();
      this.showAlertError();
    }
  }
  mystory2:{s:stories,script:boolean}={s:this.mystory,script:true};
map(){
  if(this.mystory.script == null || this.mystory.script == undefined || this.mystory.script == ''){
    this.mystory2.s = this.mystory;
    this.mystory2.script = false;
  }else{
    this.mystory2.s = this.mystory;
    this.mystory2.script = true;
  }
  console.log('================ final story to showing ====================');
  console.log(this.mystory2);
}
}
