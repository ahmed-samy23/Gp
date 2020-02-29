import { SERVER_IP } from './../../Models/connection';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { report } from '../../Models/report';

/**
 * Generated class for the ReportUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-user',
  templateUrl: 'report-user.html',
})
export class ReportUserPage {

  getdata:any;
  type:number;
  statu:boolean = true;
  myreport:report =new report();
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl :AlertController ,private http:Http
                ,public toastCtrl: ToastController) {
    this.getdata =this.navParams.get('person');
    this.type = this.navParams.get('type');
    this.myreport.Massage='';
    console.log('===getdata=======')
    console.log(this.getdata);
    console.log(this.type);
    this.ifvisitor(this.type);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportUserPage');
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }

  report(){
    this.myreport.from_id = Number(window.localStorage.getItem('session'));
    this.myreport.to_id = this.getdata.id;
    this.myreport.type_from = 2;
    this.myreport.type_to = this.type;
    this.myreport.Repleyfrom='جارى النظر فى بلاغك..يرجى الانتظار';
    this.myreport.Repleyto = 'سوف يقوم المسئول بالنظر فى البلاغ وسيقوم باظهار تعليقه لك';
    if(this.myreport.Massage == ''){
      console.log('=====> my report')
      console.log(this.myreport)
      let alert = this.alertCtrl.create({
        title: '!!بيانات غير مكتملة',
        subTitle: 'من فضلك يجب عليك تحديد سبب الابــلاغ...فهى متطلبات اساسية',
        buttons: ['!!حسنــا']
      });
      alert.present();
    }else{
      console.log('=====> my report')
      console.log(this.myreport)
      try {
        this.http.post(SERVER_IP +'report',this.myreport)
      .subscribe(
        (data) =>{
          console.log(data)
          if(data.status == 201){
            const toast = this.toastCtrl.create({
              message: 'تم ارســال الابلاغ للمسئولين..وسوف نأخذه بعين الاعتبار ونواليكم بالتفاصيل ان لزم الامر',
              duration: 4000
              });
              toast.present();
              this.navCtrl.pop();
          }
        });
      } catch (error) {
        console.log(error);
        this.showAlertError();
      } 
    }
  }

  ifvisitor(t:number){
    if(t == 2){
      this.statu = true;
      console.log('this is visitor');
    }else if ( t==3){
      this.statu = false;
      console.log('this is doctor');
    }
  }

  cansel(){
    this.navCtrl.pop();
  }

}
