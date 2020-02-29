import { child_test_degree } from './../../Models/child_test_degree';
import { child } from './../../Models/child';
import { test_question } from './../../Models/test_question';
import { SERVER_IP } from './../../Models/connection';
import { Http, Response } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AutismTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-autism-test',
  templateUrl: 'autism-test.html',
})
export class AutismTestPage {

  mychild:child=new child();
  results: any =[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private alertCtrl :AlertController
                  ,private loadingCtrl: LoadingController) {
    this.mychild=this.navParams.data;
    console.log(this.mychild);
    this.loader.present();
    this.returndataofquestions();
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AutismTestPage');
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  //============================getting data===============================//
  questions:test_question[]=[];
  all:test_question[]=[];
  returndataofquestions(){
    this.http.get(SERVER_IP + 'test_question')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      (data) => {
        for(var key in data){
        var temp:test_question = data[key];
        this.all.push(temp);
      }
      console.log('all list');
      console.log(this.all);
      console.log('======================================');
      this.all.forEach(element => {
        if(element.test_id == 1){
          this.questions.push(element);
        }
      });
      console.log('questions list');
      console.log(this.questions);
      console.log('======================================');
      this.loader.dismiss();
    }
    );
  }
  //=======================================================================================
mcqAnswer(index,value){
this.results[index] = value;
console.log('=============> tw7od');
console.log(this.results);
}

autismtestresult:child_test_degree=new child_test_degree()
submit(){
  console.log(this.results);
  var result:number=0;
  if(this.questions.length == this.results.length){
    this.results.forEach(element => {
      if(element == 1){
        result++;
      }
      
    });

    this.autismtestresult.degree=result;
    result = Math.floor((result/this.results.length)*100);
    this.autismtestresult.test_id=1;
    this.autismtestresult.percentage=result;
    this.autismtestresult.child_id=this.mychild.id;

    console.log("result = "+ result + " length = " + this.results.length);
    if(result<40){
      this.autismtestresult.notes='لا داعى للقلق..فطفلك لا يعانى من هذا المرض وطبيعى'
    }else if(result >=40 && result < 55){
      this.autismtestresult.notes='قد يكون طفلك فى طريقه للمرض بهذا..ولكن لا داعى للقلق فقد تكون هذه اعراض طبيعية وتزول مع الوقت فقط يجب متابعته اكتر واعادة الاختبارات لاحقا'
    }else if(result >=55 && result < 70){
      this.autismtestresult.notes=' للاسف قد يكون طفلك مصاب بهذا المرض وفى المرحله الاولى منه..يجب متابعته عن قرب و تجريب لعبة للالعاب المتاحة ع الموقع و اعادة الاختبارات لاحقا'
    }else if(result >=70 && result < 85){
      this.autismtestresult.notes='للاسف طفلك مصاب بهذا المرض وفى المرحله الثانية منه..يجب عرضه على دكتور متخصص لمتابعة حالته عن قرب'
    }else if(result > 85){
      this.autismtestresult.notes='للاسف طفلك مصاب بهذا المرض وفى المرحله الثالثة وهى مرحلة متأخره يجب عرضه على دكتور متخصص فى اسرع وقت ممكن..نأمل له الشفاء'
    }
    console.log('==========> object result')
    console.log(this.autismtestresult)
    var a:child_test_degree=this.autismtestresult;
    var c:child=this.mychild;
    var all:test_question[]=this.all;
    this.navCtrl.push('CommunicationTestPage',{all,a,c})
  }else{
    console.log('======> fi as2la n2sa');
    let alert = this.alertCtrl.create({
      title: '!!بيانات غير مكتملة',
      subTitle: 'من فضلك اجب على كل الاسئلة...جميعها متطلبات اساسية',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  
}

}
