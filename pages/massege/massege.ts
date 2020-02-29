import { SERVER_IP } from './../../Models/connection';
import { message } from './../../Models/message';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the MassegePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-massege',
  templateUrl: 'massege.html',
})
export class MassegePage {
  person:any;
  type:number;
  newmess:message = new message();
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 20000
  });
  loader2 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 20000
  });
  doc:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http
    ,private loadingCtrl: LoadingController,private alertCtrl:AlertController,private toastCtrl: ToastController) {
    this.person =this.navParams.get('person');
    this.type = this.navParams.get('type');
    console.log('====== sending data ==========');
    console.log(this.person);
    console.log(this.type);
    this.newmess.message1='';
    if(this.type == 3){
      this.doc = true;
    }
    this.loader.present();
    this.getmessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MassegePage');
  }
  chickifphoto(){
    return false; //if massage have photo
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  //====================== get massages ========================
  status:boolean = false;
  allmassages:message[]=[];
  mymessages:message[]=[];
  getmessages(){
    try {
      this.http.get(SERVER_IP + 'message')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) => {
          for(var key in data){
          var temp:message = data[key];
          this.allmassages.push(temp);
        }
        console.log('=====================> allmassages');
        console.log(this.allmassages);
        console.log('======================================');
        this.allmassages.forEach(element => {
          if(
            ((element.from_id == Number(window.localStorage.getItem('session')) && element.from_type == 2)
        || (element.to_id == Number(window.localStorage.getItem('session')) && element.to_type == 2))
        && ((element.from_id == this.person.id && element.from_type == this.type)
        || (element.to_id == this.person.id && element.to_type == this.type))){
          this.mymessages.push(element);
          }
        });
        console.log('=====================> mymessages');
        console.log(this.mymessages);
        console.log('======================================');
        if(this.mymessages.length > 0){
          this.status = true;
          this.mapping();
        }else{
          this.status = false;
          this.loader.dismiss();
        }
      }
      )
    } catch (error) {
      console.log(error);
      this.showAlertError();
      this.loader.dismiss();
    }
  }
  ourmessages:{m:message,i:boolean}[]=[];
  mapping(){
    this.mymessages.forEach(element => {
      if((element.from_id == Number(window.localStorage.getItem('session')) && element.from_type == 2)){
        this.ourmessages.push({m:element , i:true});
      }else{
        this.ourmessages.push({m:element , i:false});
      }
    });
    this.ourmessages.reverse();
    console.log('=====================> ourmessages');
    console.log(this.ourmessages);
    console.log('======================================');
    this.loader.dismiss();
  }
  //====================== send massage =========================
  sendmessage(){
    if(this.newmess.message1 == ''){
      console.log('this not message');
      let alert = this.alertCtrl.create({
        title: '!!بيانات غير مكتملة',
        subTitle: 'من فضلك ادخل نص الرسالة الذى تريد ارسالها',
        buttons: ['!!حسنــا']
      });
      alert.present();
    }else{
      this.newmess.from_id = Number(window.localStorage.getItem('session'));
      this.newmess.from_type = 2;
      this.newmess.to_id =this.person.id;
      this.newmess.to_type = this.type;
      console.log('============ obj to send ===================');
      console.log(this.newmess);
      try {
        this.http.post(SERVER_IP +'message',this.newmess)
    .subscribe(
      (data) =>{
        console.log(data)
        if(data.status == 201){
          this.navCtrl.pop();
          var person:any = this.person;
          var type:number =this.type;
          this.navCtrl.push('MassegePage',{person,type});
        }
      });
      } catch (error) {
        console.log(error);
        this.showAlertError();
        this.loader.dismiss();
      }
    }
  }
  //====================== delete message =======================
  alert_deletemessage(m:message){
    let confirm = this.alertCtrl.create({
      title: 'تأكيد حذف الرسالة',
      message:'فى حالة حذف الرسالة لا يمكنك استرجاعها مرة اخرى',
      buttons: [
        {
          text: '!!الغاء',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '!!موافق',
          handler: () => {
            this.loader2.present();
            this.deletemessage(m);
          }
        }
      ]
    });
    confirm.present();
  }
  deletemessage(m:message){
    try {
      const headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    
    let options = new RequestOptions({ headers : headers});
    this.http.delete(SERVER_IP + 'message' +'?id=' + m.id ,options)
    .subscribe(
      (data) => {
        console.log(data);
        console.log('deleted message done');
        if(data.status == 200){
          this.navCtrl.pop();
          this.loader2.dismiss();
          let toast = this.toastCtrl.create({
            message: '!! تم حذف الرسالة بنجاح ',
            duration: 4000
          });
          toast.present();
          var person:any = this.person;
          var type:number =this.type;
          this.navCtrl.push('MassegePage',{person,type});
        }
    });
    } catch (error) {
      
    }
  }
}
