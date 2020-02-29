import { Http } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { feedback } from './../../Models/feedback';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  newfeedback:feedback = new feedback();
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController,private http:Http
    , private alertCtrl :AlertController ,public toastCtrl: ToastController) {
    menuCtrl.enable(true);
    this.newfeedback.title='';
    this.newfeedback.feedback1='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  menubutton(){
    this.menuCtrl.open();
  }
  sendfeedback(){
    if(this.newfeedback.title=='' || this.newfeedback.feedback1 =='') {
      console.log('================= new feedback =================');
      console.log(this.newfeedback)
      let alert = this.alertCtrl.create({
        title: '!!بيانات غير مكتملة',
        subTitle: 'من فضلك يجب عليك تحديد عنوان الملحوظـة/الشكوى مع كتابت مضمونها وشرحها...جميعها متطلبات اساسية',
        buttons: ['!!حسنــا']
      });
      alert.present();
    }else{
      console.log('================= new feedback =================');
      console.log(this.newfeedback)
    try {
      this.http.post(SERVER_IP +'feedback',this.newfeedback)
    .subscribe(
      (data) =>{
        console.log(data)
        if(data.status == 201){
          const toast = this.toastCtrl.create({
            message: 'تم ارسال ملاحظتــك/شكــواك..وسوف ناخدها بعين الاعتبار..ونأمل ان نكون عند حسـن ظنكم بنا',
            duration: 3000
            });
            toast.present();
          this.navCtrl.setRoot('PostsPage');
        }
      });
    }catch (error) {
      console.log(error);
      let alert2 = this.alertCtrl.create({
        title: '!!فشل التعامل مع السيرفر',
        subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
        buttons: ['!!حسنــا']
      });
      alert2.present();
    }

    }
  }
}
