import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { report } from '../../Models/report';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';



@IonicPage()
@Component({
  selector: 'page-reports-about-you',
  templateUrl: 'reports-about-you.html',
})
export class ReportsAboutYouPage {

  myReports : report[]=[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController) {
    this.loader.present();
    this.LoadAllReports();
  }
  status:boolean =false;
  LoadAllReports(){
    this.http.get(SERVER_IP +'report')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:report = data[key];
        if(temp.to_id == Number(localStorage.getItem('session')) && temp.type_to == 2 && temp.Repleyto != null){
          this.myReports.push(temp);
          }
        }
        console.log('================all order')
        console.log(this.myReports);
        if(this.myReports.length>0){
          this.myReports.reverse();
          this.status =true;
        }else{
          this.status =false;
        }
        this.loader.dismiss();
      }
    );
  }


}
