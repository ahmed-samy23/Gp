import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { Orders } from '../../Models/orders';
import { SERVER_IP } from './../../Models/connection';
import { Http, Response } from '@angular/http';


/**
 * Generated class for the BillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {
  allorder:Orders[]=[];
  myorder:Orders[]=[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController
    ,private menuCtrl:MenuController) {
    this.menuCtrl.enable(true);
    this.loader.present();
    this.getmyorder();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BillsPage');
  }


  goinfo(or:Orders){
    this.navCtrl.push('BillDetailesPage',or);
  }
  menubutton(){
    this.menuCtrl.open();
  }
  status:boolean = false;
  getmyorder(){
    try {
      this.http.get(SERVER_IP + 'Order')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      (data) =>  {
        for(var key in data){
        var temp:Orders = data[key];
        this.allorder.push(temp);
      }
      console.log('=======> this.allorder');
      console.log(this.allorder);
      this.allorder.forEach(c => {
        if(Number(localStorage.getItem('session')) == c.visitor_id){
          var d:Date=new Date(c.date);
          //c.date = d.getDate().toString() + '/' +(d.getMonth()+1).toString() + '/'+ d.getFullYear().toString();
          c.date = d.toDateString();
          this.myorder.push(c);
        }
      });
      console.log('=======> this.myorder');
      console.log(this.myorder);
      if(this.myorder.length > 0 ){
        this.myorder.reverse();
        this.status = true;
      }else{
        this.status = false;
      }
      this.loader.dismiss();
      }
    );
    } catch (error) {
      console.log(error);
      this.loader.dismiss();
    }
    
  }

}
