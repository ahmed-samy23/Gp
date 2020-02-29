import { Response, Http } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { clinic } from '../../Models/clinic';

/**
 * Generated class for the ProfileUserModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-user-modal',
  templateUrl: 'profile-user-modal.html',
})
export class ProfileUserModalPage {
  getdata:any;
  type:number;
  statu:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewctrl:ViewController , private http:Http) {
    this.getdata =this.navParams.get('person');
    this.type = this.navParams.get('type');
    console.log('===getdata=======')
    console.log(this.getdata);
    console.log(this.type);
    this.ifvisitor(this.type);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUserModalPage');
  }
  dismiss(){
    this.viewctrl.dismiss();
  }
  ifvisitor(t:number){
    if(t == 2){
      this.statu = true;
    }else if ( t==1){
      this.statu = false;
      this.getclinicslist();
    }
  }
  clinicslist:clinic[]=[];
  linkclinic:string='';
  getclinicslist(){
    this.http.get(SERVER_IP + 'clinic')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:clinic = data[key];
        this.clinicslist.push(temp);
      }
      console.log('this.clinicslist befor doc');
      console.log(this.clinicslist);
      console.log('======================================');
      this.clinicslist.forEach(element => {
        if(element.doc_id == this.getdata.id){
          this.linkclinic = element.location;
          console.log(this.linkclinic)
        }
      });
    }
    );
  }
}
