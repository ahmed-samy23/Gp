
import { test_question } from './../../Models/test_question';
import { child_test_degree } from './../../Models/child_test_degree';
import { child } from './../../Models/child';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CommunicationTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-communication-test',
  templateUrl: 'communication-test.html',
})
export class CommunicationTestPage {

  mychild:child=new child();
  autism:child_test_degree=new child_test_degree();
  results: any =[];
  allqustions:test_question[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl :AlertController) {
    this.allqustions=this.navParams.get('all');
    this.mychild=this.navParams.get('c');
    this.autism=this.navParams.get('a');
    console.log(this.mychild);
    console.log(this.autism);
    this.returndataofquestions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunicationTestPage');
  }

  //============================getting data===============================//
  questions:test_question[]=[];
  returndataofquestions(){
    this.allqustions.forEach(element => {
      if(element.test_id == 2){
        this.questions.push(element);
      }
    });
      console.log('questions list');
      console.log(this.questions);
      console.log('======================================');
  }
  //=======================================================================================
mcqAnswer(index,value){
this.results[index] = value;
console.log('=============> t5a6ob');
console.log(this.results);
}

communicationtestresult:child_test_degree=new child_test_degree()
submit(){
  console.log(this.results);
  var result:number=0;
  if(this.questions.length == this.results.length){
    this.results.forEach(element => {
      if(element == 1){
        result++;
      }
      
    });

    this.communicationtestresult.degree=result;
    result = Math.floor((result/this.results.length)*100);
    this.communicationtestresult.test_id=2;
    this.communicationtestresult.percentage=result;
    this.communicationtestresult.child_id=this.mychild.id;

    console.log("result = "+ result + " length = " + this.results.length);
    if(result<40){
      this.communicationtestresult.notes='لا داعى للقلق..فطفلك لا يعانى من هذا المرض وطبيعى'
    }else if(result >=40 && result < 55){
      this.communicationtestresult.notes='قد يكون طفلك فى طريقه للمرض بهذا..ولكن لا داعى للقلق فقد تكون هذه اعراض طبيعية وتزول مع الوقت فقط يجب متابعته اكتر واعادة الاختبارات لاحقا'
    }else if(result >=55 && result < 70){
      this.communicationtestresult.notes=' للاسف قد يكون طفلك مصاب بهذا المرض وفى المرحله الاولى منه..يجب متابعته عن قرب,وتجريب لعبة للالعاب المتاحة ع الموقع و اعادة الاختبارات لاحقا'
    }else if(result >=70 && result < 85){
      this.communicationtestresult.notes='للاسف طفلك مصاب بهذا المرض وفى المرحله الثانية منه..يجب عرضه على دكتور متخصص لمتابعة حالته عن قرب'
    }else if(result > 85){
      this.communicationtestresult.notes='للاسف طفلك مصاب بهذا المرض وفى المرحله الثالثة وهى مرحلة متأخره يجب عرضه على دكتور متخصص فى اسرع وقت ممكن..نأمل له الشفاء'
    }
    console.log('==========> object result')
    console.log(this.communicationtestresult)
    var a:child_test_degree=this.autism;
    var c:child=this.mychild;
    var com:child_test_degree=this.communicationtestresult;
    var all:test_question[]=this.allqustions;
    this.navCtrl.push('HearingTestPage',{all,a,com,c})
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
