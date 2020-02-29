import { SERVER_IP } from './../../Models/connection';
import { Http, Headers, RequestOptions } from '@angular/http';
import { visitor } from './../../Models/visitor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the EditmyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editmyprofile',
  templateUrl: 'editmyprofile.html',
})
export class EditmyprofilePage {
  myInfoEdited:visitor=new visitor();
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController
              ,private http:Http) {
    this.myInfoEdited = this.navParams.data 
    console.log(this.myInfoEdited);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditmyprofilePage');
  }

  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }

  showPrompt(newpass:string) {
    let prompt = this.alertCtrl.create({
      title: 'كلمة السر',
      message: "لتأكيد التعديلات يرجى ادخال كلمة السر الحالية",
      inputs: [
        {
          name: 'Password',
          placeholder: 'كلمة السر الحاليــة'
        },
      ],
      buttons: [
        {
          text: 'تــأكيد التعديلات',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.Password);
            this.chickpassword(data.Password,newpass);
          }
        }
      ]
    });
    prompt.present();
  }

  showalert(){
    let errorpass = this.alertCtrl.create({
      title: 'خطأ بكلمة السر الحالية',
      message: "لا يمكنك تعديل بياناتك الا اذا كانت كلمة السر الحالية التى ادخلتها صحيحة",
      buttons: [
        {
          text: '!!أعـد المحاولة, لاحقا',
          handler: data => {

          }
        }
      ]
    });
    errorpass.present();
  }

  chickpassword(pass:string,newpass:string){
    console.log('pass');
    console.log(pass);
    if(pass == this.myInfoEdited.password){
      this.editemyInfo(newpass);
    }else{
      this.showalert();
    }
  }
  editemyInfo(newpass:string){
    console.log(this.myInfoEdited);
    if(newpass == ''){
      console.log('===== mfi4 pass gdid');
      console.log(this.myInfoEdited);
      try{
        var url = SERVER_IP +'visitors?id=' + this.myInfoEdited.id;
        console.log(url);
        this.http.put(SERVER_IP +'visitors?id=' + this.myInfoEdited.id,this.myInfoEdited)
        .subscribe(
          (data) => console.log(data.status)
        );
      }catch (error){
        console.log(error);
      }
    }else{
      console.log('===== with pass gdid');
      this.myInfoEdited.password = newpass;
      console.log(this.myInfoEdited);
      try {
        var url2 = SERVER_IP +'visitors?id=' + this.myInfoEdited.id;
        console.log(url2);
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        headers.append('Accept','application/json');
        headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
        let options = new RequestOptions({ headers : headers});
        this.http.put(SERVER_IP +'visitors?id=' + this.myInfoEdited.id,this.myInfoEdited  ,options)
        .subscribe(
          (data) =>{ 

            this.showAlertError();
            console.log(data.status);
            console.log(data.json);
          }
        );
      }catch (error){
        console.log(error);
      }
    }
    
  }

}
