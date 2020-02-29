import { child_test_degree } from './../../Models/child_test_degree';
import { Test_category } from './../../Models/Test_category';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { child } from './../../Models/child';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ModalchiledinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalchiledinfo',
  templateUrl: 'modalchiledinfo.html',
})
export class ModalchiledinfoPage {
  mychild:child =new child();
  mychilddegrees:child_test_degree[] =[];
  childdegreeslist:child_test_degree[] =[];
  listoftests:Test_category[]=[];
  gradeslist:Array<{t:Test_category ,m:child_test_degree}>=[];
  b:Date =new Date(this.mychild.Birthday);
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams ,private viewctrl:ViewController ,private http:Http
              ,private alertCtrl:AlertController,private loadingCtrl: LoadingController) {
    this.mychild=this.navParams.data;
    console.log('=============> my child intered')
    console.log(this.mychild)
    this.b =new Date(this.mychild.Birthday);
    this.loader.present();
    this.getlistoftests();
  }
  dismiss(){
    this.viewctrl.dismiss();
  }
  alert_test(){
    let confirm = this.alertCtrl.create({
      title: 'تأكيد اعادة الاختبارات',
      message:'!!هل انت متاكد من انك تريد اعادة الاختبارات مره اخرى...فى حالة الموافقة سوف يجب عليك اعادة جميع الاختبارات اجباريا',
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
            this.navCtrl.setRoot('AutismTestPage',this.mychild)
          }
        }
      ]
    });
    confirm.present();

  }
  
    getlistoftests(){
      this.http.get(SERVER_IP +'Test_category')
      .map((response :Response) => response.json())
      .subscribe(
        (data) =>{
          for(var key in data){
          var temp:Test_category = data[key];
          this.listoftests.push(temp);
          }
        this.getmychildtestdegree_info();
        }
      );
    }

    getmychildtestdegree_info(){
      this.http.get(SERVER_IP +'child_test_degree')
      .map((response :Response) => response.json())
      .subscribe(
        (data) =>{
          for(var key in data){
          var temp:child_test_degree = data[key];
          this.childdegreeslist.push(temp);
          }
          console.log('=================> this.childdegreeslist')
          console.log(this.childdegreeslist)
          this.childdegreeslist.forEach(c => {
            if(this.mychild.id == c.child_id){
              this.mychilddegrees.push(c);
            }
            });
          console.log('=================> this.mychilddegrees')
          console.log(this.mychilddegrees)
          this.makemap();
        }
      );
    }

  makemap(){
    this.listoftests.forEach(test => {
      this.mychilddegrees.forEach(childd => {
        if(test.id == childd.test_id){
          this.gradeslist.push({t:test , m: childd});
        }
      });
      
    });
    this.loader.dismiss();
  }

  shownotealert(note:string){
    let alert = this.alertCtrl.create({
      title: 'ملاحظتنا على نتيجه الاختبار',
      subTitle: note,
      buttons: ['!!حسنـا']
    });
    alert.present();
  }

  GoToTest(typeoftest:number){
    var childid:number=this.mychild.id;
   this.navCtrl.push('TestdetailsPage',{typeoftest, childid});
  }

  GoToMyVacc(){
    this.navCtrl.push('MyVaccinationPage',this.mychild)
  }

  GoToMystories(){
    this.navCtrl.push('ChildstoriesreadingPage',this.mychild)
  }

}
