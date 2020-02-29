import { doctor } from './../../Models/doctor';
import { visitor } from './../../Models/visitor';
import { SERVER_IP } from './../../Models/connection';
import { Http, Response } from '@angular/http';
import { message } from './../../Models/message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';

/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {
  allmassages:message[]=[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 20000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams ,private menuCtrl:MenuController,private http:Http
              ,private loadingCtrl: LoadingController,private alertCtrl:AlertController) {
    this.menuCtrl.enable(true);
    this.loader.present();
    this.getmessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatListPage');
  }
  menubutton(){
    this.menuCtrl.open();
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  gotomessagepage(person:any,type:number){
    this.navCtrl.push('MassegePage',{person,type})
  }
  //====================== get massages ========================
  status:boolean = false;
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
          if((element.from_id == Number(window.localStorage.getItem('session')) && element.from_type == 2)
        || (element.to_id == Number(window.localStorage.getItem('session')) && element.to_type == 2)){
          this.mymessages.push(element);
          }
        });
        console.log('=====================> mymessages');
        console.log(this.mymessages);
        console.log('======================================');
        if(this.mymessages.length > 0){
          this.status = true;
          this.returndataofdoctors();
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
  //===================================== get visitors and doctors list =========================
  doctorlist: doctor[]=[];
  returndataofdoctors(){
    try {
      this.http.get(SERVER_IP + 'doctor')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:doctor = data[key];
        this.doctorlist.push(temp)
        console.log('doctor list');
        console.log(this.doctorlist);
        console.log('======================================');
      }
      this.returndataofvisitors();
    }
    );
    } catch (error) {
      console.log(error);
      this.showAlertError();
      this.loader.dismiss();
    }
  }

  visitorslist: visitor[]=[];
  returndataofvisitors(){
    try {
      this.http.get(SERVER_IP + 'visitors')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:visitor = data[key];
        if(temp.block != true){
        this.visitorslist.push(temp);
      }
      }
      console.log('visitor list');
      console.log(this.visitorslist);
      console.log('======================================');
      this.getuserslist();
    }
    );
    } catch (error) {
      console.log(error);
      this.showAlertError();
      this.loader.dismiss();
    }
  }
  //=========================== get list to =================================
  getuserslist(){
    this.mymessages.forEach(element => {
      if((element.from_id == Number(window.localStorage.getItem('session')) && element.from_type == 2)){
        if(element.to_type == 2){
          this.visitorslist.forEach(v => {
            if(v.id == element.to_id){
              this.chickexist(v,true);
            }
          });
        }else if(element.to_type == 3){
          this.doctorlist.forEach(d => {
            if(d.id == element.to_id){
              this.chickexist(d,false);
            }
          });
        }else if(element.to_type == 1){
          var e:{
            id:number;
            first_name:string,
            last_name:string,
            photo :string,
            block:boolean
          }={
            id:1,
            first_name:'Admin',
            last_name:'',
            photo :'a.jpg',
            block:false
          }
          this.chickexist(e,true);
        }
      }
    });
    this.userchatlist.forEach(element => {
      if(element.p.block != true){
        this.userchatlist2.push(element);
      }
    });
    console.log('============= userchatlist ===================');
    console.log(this.userchatlist);
    console.log('==============================================');
    console.log('============= userchatlist without block ===================');
    console.log(this.userchatlist2);
    console.log('==============================================');
    this.mappingwithlastmess();
    
  }
  userchatlist:{p:any,v:boolean}[]=[];
  userchatlist2:{p:any,v:boolean}[]=[];
  chickexist(user:any,t:boolean){
    console.log('======== in exist ==========');
    console.log(user)
    var c:number =0;
    this.userchatlist.forEach(element => {
      if(element.p.id == user.id && element.p.phone == user.phone){
        c++
      }
    });
    if(c == 0){
      this.userchatlist.push({p:user,v:t});
    }
    console.log('======== list ==========');
    console.log(this.userchatlist)
  }
  userchatlist3:{p:any,v:boolean,mess:string,ty:number}[]=[];
  mappingwithlastmess(){
    this.userchatlist2.forEach(u => {
      var type:number =0;
      if(u.p.phone == undefined ||u.p.phone == null ){
        type = 1;
      }
      else if(u.v == true){
        type = 2;
      }else{
        type = 3 ;
      }
      console.log('============> type');
      console.log(type);
      var ourmassages:message[]=[];
      this.mymessages.forEach(m => {
        if((m.from_id == u.p.id && m.from_type == type)
        || (m.to_id == u.p.id && m.to_type == type)){
          ourmassages.push(m);
        }
      });
      console.log('==============> ourmassages');
      console.log(ourmassages);
      var m:string = ourmassages[ourmassages.length-1].message1;
      this.userchatlist3.push({p:u.p , v:u.v , mess :m ,ty:type});
    });
    this.userchatlist3.reverse();
    console.log('============= userchatlist with mass ===================');
    console.log(this.userchatlist3);
    console.log('==============================================');
    this.loader.dismiss();
  }
}
