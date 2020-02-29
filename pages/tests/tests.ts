import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { Test_category } from './../../Models/Test_category';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the TestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
})
export class TestsPage {
  testcategoieslist:Test_category[]=[];
  loader2 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController
        ,private loadingCtrl:LoadingController ,private alertCtrl:AlertController, public http: Http) {
    this.menuCtrl.enable(true);
    this.loader2.present();
    this.returndataoftestscategies();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestsPage');
  }
  menubutton(){
    this.menuCtrl.open();
  }
  returndataoftestscategies(){
    this.http.get(SERVER_IP + 'test_category')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:Test_category = data[key];
        this.testcategoieslist.push(temp);
      
      }
      console.log('testcategoieslist');
      console.log(this.testcategoieslist);
      console.log('======================================');
      this.loader2.dismiss();
    }
    );
  }
  selectchild(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
    this.navCtrl.setRoot('ChildernPage');
  }
  
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '!! تنبيــه هام',
      message: "!! برجاع اختيار الطفل المراد عمل الاختبار له اولا",
      buttons: [
        {
          text: 'الغــاء',
        },
        {
          text: 'اختيار',
          handler: data => {
            this.selectchild();
          }
        }
      ]
    });
    prompt.present();
  }

}
