import { child_test_degree } from './../../Models/child_test_degree';
import { child_vaccinations } from './../../Models/child_vaccinations';
import { child } from './../../Models/child';
import { SERVER_IP } from './../../Models/connection';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController, LoadingController } from 'ionic-angular';


/**
 * Generated class for the ChildernPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-childern',
  templateUrl: 'childern.html',
})
export class ChildernPage {
  childrenlist:child[]=[];
  mychildrenlist:child[]=[];
  statu:boolean = false;
  vaciinationlist:child_vaccinations[]=[];
  deletedmyvacclist:child_vaccinations[]=[];
  ifdeletechild:number = 0;
  loader3 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  loader2 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 30000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams ,private menuCtrl:MenuController
              ,private alertCtrl:AlertController ,private http:Http ,private toastCtrl: ToastController
              ,private loadingCtrl: LoadingController) {
        this.menuCtrl.enable(true);
        this.loader3.present();
        this.mychildreninfo();
        this.showAlert();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildernPage');
    console.log(window.localStorage.getItem('session'))
  }
 //===============================
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'الاختبــارات',
      subTitle: 'يمكنك عمل الاختبارات ومعرفة النتائج عن طريق اختيار الطفل المراد عمل له الاختبار والضغط عليه.. ومن ثم الضغط على اسم الاختبار',
      buttons: ['!! حسنـا']
    });
    alert.present();
  }

  menubutton(){
    this.menuCtrl.open();
  }

  goinfo(ch:child){
    this.navCtrl.push('ModalchiledinfoPage',ch);
  }


  addchild(){
    this.navCtrl.push('AddchildPage');
  }
  //===============================delet child functions ===================================
  alert_deletechild(childid:number){
    //alert && delete api from child and child_vaccinations
    let confirm = this.alertCtrl.create({
      title: 'تأكيد حذف بيانات الطفل',
      message:'!!فى حالة حذف الطفل سوف يتم حذف جميع بياناته من الموقع',
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
            this.deletedmygedreelist=[];
            this.deletedmyvacclist =[];
            this.getchildviccs(childid);
          }
        }
      ]
    });
    confirm.present();
  }


  deletechild(childid:number){
    try {
      const headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    
    let options = new RequestOptions({ headers : headers});
    this.http.delete(SERVER_IP + 'child'+'?id=' + childid ,options)
    .subscribe(
      (data) => {
        console.log(data);
        if(data.status == 200){
          console.log('=========================> delete child succesfully')
          let toast = this.toastCtrl.create({
            message: '!! تم حذف طفلك بنجـــاح وكل ما يخصه... نأمل ان نكون قد استفدت معنا ',
            duration: 4000
          });
          this.loader2.dismiss();
          toast.present();
          this.navCtrl.setRoot('ChildernPage');
        }else{
          this.loader2.dismiss();
          console.log('error in delete child')
        }
    });
    } catch (error) {
      console.log(error)
    }
    
  }

  deletevaccs(vaccid:number , ch_id:number){
    console.log('======================== in func delete vaccs');
    console.log('el id bta3 elvacc '+ vaccid);
    console.log('el id bta3 elchild '+ ch_id);
    console.log(this.deletedmyvacclist);
    console.log('=================================================');
    console.log('ifdeletechild ' + this.ifdeletechild)
    console.log('deletedmyvacclist.length ' + this.deletedmyvacclist.length)
    console.log('=================================================');
    try {
      const headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    
    let options = new RequestOptions({ headers : headers});
    this.http.delete(SERVER_IP + 'child_vaccinations'+'?id=' + vaccid ,options)
    .subscribe(
      (data) => {
        console.log(data);
        console.log('deleted vAaccination done');
        if(this.ifdeletechild == this.deletedmyvacclist.length)
        {
          this.deletedmygedreelist = [] ;
          console.log('========> wtsawo');
          this.getchilddegree(ch_id);
        }
    });
    } catch (error) {
      console.log(error)
    }

  }
  deletedegrees(degreeid:number , ch_id:number){
    console.log('======================== in func delete degree');
    console.log('el id bta3 eldgree '+ degreeid);
    console.log('el id bta3 elchild '+ ch_id);
    console.log(this.deletedmygedreelist);
    console.log('=================================================');
    console.log('ifdeletechild ' + this.ifdeletechild)
    console.log('deletedmygedreelist.length ' + this.deletedmygedreelist.length)
    console.log('=================================================');
    try {
      const headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    
    let options = new RequestOptions({ headers : headers});
    this.http.delete(SERVER_IP + 'child_test_degree' +'?id=' + degreeid ,options)
    .subscribe(
      (data) => {
        console.log(data);
        console.log('deleted gedree done');
        if(this.ifdeletechild == this.deletedmygedreelist.length)
        {
          console.log('==================> etsawo then to delete');
          this.deletedmygedreelist=[];
          console.log('=================================================');
          //this.navCtrl.setRoot('ChildernPage');
          this.deletechild(ch_id);
        }
    });
    } catch (error) {
     console.log(error);
    }

  }

  //============================== looding children data=============================

  mychildreninfo(){
    try {
      this.http.get(SERVER_IP + 'child')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) =>  {
          for(var key in data){
          var temp:child = data[key];
          this.childrenlist.push(temp);
        }
        console.log('=======> this.childrenlist');
        console.log(this.childrenlist);
        this.childrenlist.forEach(c => {
          if(Number(localStorage.getItem('session')) == c.visitor_id){
            this.mychildrenlist.push(c);
          }
        });
        console.log('=======> this.mychildrenlist');
        console.log(this.mychildrenlist);
        this.havechild(this.mychildrenlist);
        }
      );
    } catch (error) {
      this.showAlertError();
      console.log(error);
    }
  }

  havechild(mychildrenlistget:child[]){
    if(mychildrenlistget.length > 0){
      this.statu = true;
    }else{
      this.statu = false;
    }
    this.loader3.dismiss();
  }

  gedreelist:child_test_degree[]=[];
  deletedmygedreelist:child_test_degree[]=[];
  getchilddegree(childid:number){
    this.deletedmygedreelist = [] ;
    this.http.get(SERVER_IP + 'child_test_degree')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      (data) => {
        for(var key in data){
        var temp:child_test_degree = data[key];
        this.gedreelist.push(temp);
      }
      this.gedreelist.forEach(element => {
        if(element.child_id == childid){
          this.deletedmygedreelist.push(element);
        }
      });
      if(this.deletedmygedreelist.length != this.ifdeletechild){
        console.log('=======deletedmygedreelist ===========')
      console.log(this.deletedmygedreelist);
      console.log('========================================')
      this.newfunc(childid);
      }
    });
  }
  newfunc(childid:number){
    if(this.deletedmygedreelist.length > 0){
      this.ifdeletechild = 0;
      this.deletedmygedreelist.forEach(element => {
        this.ifdeletechild ++;
        this.deletedegrees(element.id , childid);
        //console.log('send degree of id= ' + element.id);
    });
    }else{
      console.log('then go to delete child')
      //this.deletechild(childid);
    }
  }
  getchildviccs(childid:number){
    //this.loader.present();
    this.http.get(SERVER_IP + 'child_vaccinations')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      (data) => {
        for(var key in data){
        var temp:child_vaccinations = data[key];
        this.vaciinationlist.push(temp);
      }
      this.vaciinationlist.forEach(element => {
        if(element.child_id == childid){
          this.deletedmyvacclist.push(element);
        }
      });
        console.log('=======my vaccs list ===========')
        console.log(this.deletedmyvacclist)
        console.log('=======my vaccs length ===========')
        console.log(this.deletedmyvacclist.length)
        //this.deletechild(childid);
        if(this.deletedmyvacclist.length > 0){
          this.ifdeletechild = 0;
          this.deletedmyvacclist.forEach(element => {
            this.ifdeletechild ++;
            this.deletevaccs(element.id , childid);
        });
        }else{
          this.getchilddegree(childid);
        }
      });
  }
}
