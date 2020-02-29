import { SERVER_IP } from './../../Models/connection';
import { visitor } from './../../Models/visitor';
import { Http ,Response } from '@angular/http';
import 'rxjs/Rx';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  visitorslist: visitor[] =[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, public http : Http ,private alertCtrl:AlertController
              ,private loadingCtrl: LoadingController) {
                this.loader.present();
    this.getdata();
    
  }
  showAlert(titlestring:string , subtitlestring:string) {
    let alert = this.alertCtrl.create({
      title: titlestring,
      subTitle: subtitlestring,
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  goToRegister(){
    this.navCtrl.push('OpeningslidesPage');
  }

  async getdata(){
    //loading
    await this.http.get(SERVER_IP + 'visitors')
    .map((response :Response) => response.json())
    .subscribe(
      (data) => {
        for(var key in data){
        var temp:visitor = data[key];
        this.visitorslist.push(temp);
        //console.log('================in======================');
        //console.log(this.visitorslist);
        //console.log('**************************************');
      }
      this.loader.dismiss();
    });
  }

  async login(username,password){
    console.log(username)
    console.log(password)
    if(username == "" || password == ""){
        var title1:string='!!بيانات غير مكتملة';
        var subtitle1:string='قد تركت اسم المستخدم او كلمة السر بدون بيانات...من فضلك أعد دخول البيانات كاملة جميعهم متطلبات أساسية لتسجيل الدخول';
        this.showAlert(title1,subtitle1);
    }else {
      var statu:boolean =false;
      var auth:visitor = null;
      this.visitorslist.forEach(element => {
        if((element.user_name == username || element.email == username) && element.password == password){
            window.localStorage.setItem('session',element.id.toString());
            statu=true;
            auth=element;
            //break;
        }
      });
    if(statu){
      if(auth.block == true){
        var title5:string='!!مستخدم محظور';
        var subtitle5:string='لقد تم حظرك ومنعك من الدخول من قبل المسئول بسبب خطا ما قمت به...ناسف لن تستطيع التواصل معنا مره اخرى';
        return this.showAlert(title5,subtitle5);
      }else{
        console.log('=================session=====================');
        console.log(window.localStorage.getItem('session'));
        //to convert from string to number Number()
        this.navCtrl.setRoot('PostsPage');
        }
    }else{
        var title:string='!!مستخدم غير موجود';
        var subtitle:string='قد يكون هناك خطأ بكتابة اسم المستخدم أو كلمة السر .. تأكد منهم ثم أعد المحاولة مرة اخرى';
        return this.showAlert(title,subtitle);
      }
    }
  }
}
