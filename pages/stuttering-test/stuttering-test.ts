import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';

import { test_question } from './../../Models/test_question';
import { child_test_degree } from './../../Models/child_test_degree';
import { child } from './../../Models/child';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the StutteringTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stuttering-test',
  templateUrl: 'stuttering-test.html',
})
export class StutteringTestPage {
  mychild:child=new child();
  autism:child_test_degree=new child_test_degree();
  communication:child_test_degree=new child_test_degree();
  hearing:child_test_degree=new child_test_degree();
  results: any =[];
  allqustions:test_question[]=[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  loader2 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http, private alertCtrl :AlertController
            ,public toastCtrl: ToastController,private loadingCtrl: LoadingController) {
    this.allqustions=this.navParams.get('all');
    this.mychild=this.navParams.get('c');
    this.autism=this.navParams.get('a');
    this.communication=this.navParams.get('com');
    this.hearing=this.navParams.get('h');
    console.log(this.mychild);
    console.log(this.autism);
    console.log(this.communication);
    console.log(this.hearing);
    this.returndataofquestions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StutteringTestPage');
  }
  //============================getting data===============================//
  questions:test_question[]=[];
  degrees:child_test_degree[]=[];
  mydegrees:child_test_degree[]=[];
  found:boolean =false;
  chickexisitdergrees(){
    this.loader2.present();
    var count:number=0;
    this.http.get(SERVER_IP + 'child_test_degree')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      (data) => {
        for(var key in data){
        var temp:child_test_degree = data[key];
        this.degrees.push(temp);
      }
      
      this.degrees.forEach(element => {
        if(element.child_id == this.mychild.id){
          this.mydegrees.push(element);
          count ++;
        }
      });
        console.log('=======degrees list ===========')
        console.log(this.degrees)
        //this.deletechild(childid);
        if(count > 0){
          this.found = true;
          this.submit();
        }else{
          this.found =false;
          this.submit();
        }
      });
  
  }
  returndataofquestions(){
    this.allqustions.forEach(element => {
      if(element.test_id == 4){
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
console.log('=============> t2t2a');
console.log(this.results);
}

stutteringtestresult:child_test_degree=new child_test_degree()
submit(){
  console.log(this.results);
  var result:number=0;
  if(this.questions.length == this.results.length){
    this.results.forEach(element => {
      if(element == 1){
        result++;
      }
      
    });

    this.stutteringtestresult.degree=result;
    result =Math.floor((result/this.results.length)*100);
    this.stutteringtestresult.test_id=4;
    this.stutteringtestresult.percentage=result;
    this.stutteringtestresult.child_id=this.mychild.id;

    console.log("result = "+ result + " length = " + this.results.length);
    if(result<40){
      this.stutteringtestresult.notes='لا داعى للقلق..فطفلك لا يعانى من هذا المرض وطبيعى'
    }else if(result >=40 && result < 55){
      this.stutteringtestresult.notes='قد يكون طفلك فى طريقه للمرض بهذا..ولكن لا داعى للقلق فقد تكون هذه اعراض طبيعية وتزول مع الوقت فقط يجب متابعته اكتر واعادة الاختبارات لاحقا'
    }else if(result >=55 && result < 70){
      this.stutteringtestresult.notes=' للاسف قد يكون طفلك مصاب بهذا المرض وفى المرحله الاولى منه..يجب متابعته عن قرب وعرضه على دكتور متخصص اذا استمر على هذه الاعراض او اعادة الاختبارات لاحقا'
    }else if(result >=70 && result < 85){
      this.stutteringtestresult.notes='للاسف طفلك مصاب بهذا المرض وفى المرحله الثانية منه..يجب عرضه على دكتور متخصص لمتابعة حالته عن قرب'
    }else if(result > 85){
      this.stutteringtestresult.notes='للاسف طفلك مصاب بهذا المرض وفى المرحله الثالثة وهى مرحلة متأخره يجب عرضه على دكتور متخصص فى اسرع وقت ممكن..نأمل له الشفاء'
    }
    console.log('==========> objects result')
    console.log(this.mychild);
    console.log(this.autism);
    console.log(this.communication);
    console.log(this.hearing);
    console.log(this.stutteringtestresult);
    if(this.found == false){
      this.postresults();
    }else if(this.found == true){
      this.updateresults();
      console.log('=========> update function');
    }
  }else{
    console.log('======> fi as2la n2sa');
    let alert = this.alertCtrl.create({
      title: '!!بيانات غير مكتملة',
      subTitle: 'من فضلك اجب على كل الاسئلة...جميعها متطلبات اساسية',
      buttons: ['!!حسنــا']
    });
    this.loader2.dismiss();
    alert.present();
  }
  
}
//=======================post data===========================
postresults(){
  console.log('========> in funcyion add http ')
  var n:number=0;
  var listofresults:child_test_degree[]=[
    this.autism,
    this.communication,
    this.hearing ,
    this.stutteringtestresult
  ]
  console.log('======> listofresults');
  console.log(listofresults);
  listofresults.forEach(element => {
    try {
      this.http.post(SERVER_IP +'child_test_degree',element)
    .subscribe(
      (data) =>{
        console.log(data)
        if(data.status == 201){
          n++;
        }
        if(n==listofresults.length){
          console.log('=======> tm eltest')
          this.loader2.dismiss();
          //toast bar for user
          const toast = this.toastCtrl.create({
          message: 'تم الانتهاء من الاختبارات بنجاح...يمكنك مشاهدة نتايجهم من خلال الضعط على اسم الطفل',
          duration: 4000
          });
          toast.present();
          this.navCtrl.setRoot('ChildernPage');
          }
      } 
    );
    } catch (error) {
      console.log(error);
    }
  });
}

updateresults(){
  console.log('========> in funcyion update http ')
  var n:number=0;
  var listofresults:child_test_degree[]=[
    this.autism,
    this.communication,
    this.hearing ,
    this.stutteringtestresult
  ]
  console.log('======>befor listofresults');
  console.log(listofresults);
  this.mydegrees.forEach(my => {
    listofresults.forEach(nmy => {
      if(my.test_id == nmy.test_id){
        nmy.id = my.id
      }
    });
  });
  console.log('======>after listofresults');
  console.log(listofresults);
  listofresults.forEach(element => {
    try {
      this.http.put(SERVER_IP +'child_test_degree?id='+ element.id ,element)
    .subscribe(
      (data) =>{
        console.log(data)
        if(data.status == 0){
          n++;
        }
        if(n==listofresults.length){
          console.log('=======> tm eltest')
          //toast bar for user
          const toast = this.toastCtrl.create({
          message: 'تم الانتهاء من الاختبارات بنجاح...يمكنك مشاهدة نتايجهم من خلال الضعط على اسم الطفل',
          duration: 3000
          });
          this.loader2.dismiss();
          toast.present();
          this.navCtrl.setRoot('ChildernPage');
          }
      } 
    );
    } catch (error) {
      console.log(error);
    }
  });
}

}
