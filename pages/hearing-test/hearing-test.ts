
import { test_question } from './../../Models/test_question';
import { child_test_degree } from './../../Models/child_test_degree';
import { child } from './../../Models/child';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the HearingTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hearing-test',
  templateUrl: 'hearing-test.html',
})
export class HearingTestPage {
  mychild:child=new child();
  autism:child_test_degree=new child_test_degree();
  communication:child_test_degree=new child_test_degree();
  results: any =[];
  allqustions:test_question[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl :AlertController) {
    this.allqustions=this.navParams.get('all');
    this.mychild=this.navParams.get('c');
    this.autism=this.navParams.get('a');
    this.communication=this.navParams.get('com');
    console.log(this.mychild);
    console.log(this.autism);
    console.log(this.communication);
    this.returndataofquestions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HearingTestPage');
  }
  //============================getting data===============================//
  questions:test_question[]=[];
  returndataofquestions(){
    this.allqustions.forEach(element => {
      if(element.test_id == 3){
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
console.log('=============> sm3');
console.log(this.results);
}

hearingtestresult:child_test_degree=new child_test_degree()
submit(){
  console.log(this.results);
  var result:number=0;
  if(this.questions.length == this.results.length){
    this.results.forEach(element => {
      if(element == 1){
        result++;
      }
      
    });

    this.hearingtestresult.degree=result;
    result = Math.floor((result/this.results.length)*100);
    this.hearingtestresult.test_id=3;
    this.hearingtestresult.percentage=result;
    this.hearingtestresult.child_id=this.mychild.id;

    console.log("result = "+ result + " length = " + this.results.length);
    if(result<40){
      this.hearingtestresult.notes='لا داعى للقلق..فطفلك لا يعانى من هذا المرض وطبيعى'
    }else if(result >=40 && result < 55){
      this.hearingtestresult.notes='قد يكون طفلك فى طريقه للمرض بهذا..ولكن لا داعى للقلق فقد تكون هذه اعراض طبيعية وتزول مع الوقت فقط يجب متابعته اكتر واعادة الاختبارات لاحقا'
    }else if(result >=55 && result < 70){
      this.hearingtestresult.notes=' للاسف قد يكون طفلك مصاب بهذا المرض وفى المرحله الاولى منه..يجب متابعته عن قرب وعرضه على دكتور متخصص اذا استمر على هذه الاعراض او اعادة الاختبارات لاحقا'
    }else if(result >=70 && result < 85){
      this.hearingtestresult.notes='للاسف طفلك مصاب بهذا المرض وفى المرحله الثانية منه..يجب عرضه على دكتور متخصص لمتابعة حالته عن قرب'
    }else if(result > 85){
      this.hearingtestresult.notes='للاسف طفلك مصاب بهذا المرض وفى المرحله الثالثة وهى مرحلة متأخره يجب عرضه على دكتور متخصص فى اسرع وقت ممكن..نأمل له الشفاء'
    }
    console.log('==========> object result')
    console.log(this.hearingtestresult)
    var a:child_test_degree=this.autism;
    var c:child=this.mychild;
    var com:child_test_degree=this.communication;
    var h:child_test_degree=this.hearingtestresult;
    var all:test_question[]=this.allqustions;
    this.navCtrl.push('StutteringTestPage',{all,a,com,h,c})
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
