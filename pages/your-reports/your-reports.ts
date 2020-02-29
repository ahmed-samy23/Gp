import { report } from './../../Models/report';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { doctor } from '../../Models/doctor';
import { visitor } from '../../Models/visitor';

@IonicPage()
@Component({
  selector: 'page-your-reports',
  templateUrl: 'your-reports.html',
})
export class YourReportsPage {
 
  myReports : report[]=[];
  vistors: visitor[] = [];
  doctors : doctor[] = [];
  reportName:Array<{r:report,fName:string,lName:string}>=[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController) {
    this.loader.present();
    this.LoadAllReports();
  }

  LoadAllReports(){
    try {
      this.http.get(SERVER_IP +'report')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:report = data[key];
        if(temp.from_id == Number(localStorage.getItem('session')) && temp.type_from == 2 && temp.Repleyfrom != null){
          this.myReports.push(temp);
        }
        }
        console.log(this.myReports);
        this.LoadAllDoctors();
      });
    
    } catch (error) {
      console.log(error);
      this.loader.dismiss();
    }
  }

  LoadAllVistors(){
    try {
      this.http.get(SERVER_IP +'visitors')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:visitor = data[key];
          this.vistors.push(temp);
        }
        console.log("All Vistors============")
        console.log(this.vistors);
        this.mapingName();
      }
    );
    } catch (error) {
      console.log(error);
      this.loader.dismiss();
    }
  }

  LoadAllDoctors(){
    try {
      this.http.get(SERVER_IP +'doctor')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:doctor = data[key];
          this.doctors.push(temp);
        }
        console.log("All Doctors=============")
        console.log(this.doctors);
        this.LoadAllVistors();
      }
    );
    } catch (error) {
      console.log(error);
      this.loader.dismiss();
    }
  }
  status:boolean =false;
  mapingName(){
    this.myReports.forEach(re => {
      if(re.type_to == 2){
        this.vistors.forEach(vi=>{
          if(vi.id == re.to_id){
            this.reportName.push({
              r:re,
              fName:vi.first_name,
              lName:vi.last_name
            });
          }
        });
      }
      else{
        this.doctors.forEach(d=>{
          if(d.id == re.to_id){
            this.reportName.push({
              r:re,
              fName:d.first_name,
              lName:d.last_name
            });
          }
        });
      }
    });
    console.log("data===========");
    console.log(this.reportName);
    if(this.reportName.length>0){
      this.reportName.reverse();
      this.status =true;
    }else{
      this.status =false;
    }
    this.loader.dismiss();
  }
}
