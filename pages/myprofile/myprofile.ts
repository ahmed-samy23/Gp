import { child } from './../../Models/child';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { visitor } from './../../Models/visitor';

/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {

  visitorslist: visitor[]=[];
  childrenlist:child[]=[];
  numberofchildren:number = 0 ;
  myInfo:visitor =new visitor();
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController
    , public http: Http,private loadingCtrl: LoadingController) {
    menuCtrl.enable(true);
    this.loader.present();
    this.returndataofvisitors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }
  menubutton(){
    this.menuCtrl.open();
  }
  openeditepage(){
    this.navCtrl.push('EditmyprofilePage',this.myInfo);
  }

  returndataofvisitors(){
    this.http.get(SERVER_IP + 'visitors')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:visitor = data[key];
        this.visitorslist.push(temp)
      }
      console.log('visitor list');
      console.log(this.visitorslist);
      console.log('======================================');
      this.visitorslist.forEach(element => {
        if(element.id == Number(window.localStorage.getItem('session'))){
          this.myInfo = element;
          return console.log(this.myInfo);
        }
      });
    this.Numberofchildren();
    }
    );
  }

  Numberofchildren(){
    this.http.get(SERVER_IP + 'child')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:child = data[key];
        this.childrenlist.push(temp)
      }
      console.log('children list');
      console.log(this.childrenlist);
      this.childrenlist.forEach(element => {
        if(element.visitor_id == Number(window.localStorage.getItem('session'))){
          this.numberofchildren ++ ;
          console.log(element);
        }
      });
      this.loader.dismiss();
    }
    );
  }

}
