import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { child } from './../../Models/child';
import { child_vaccinations } from '../../Models/child_vaccinations';
import { Vaccination } from '../../Models/vaccination';
/**
 * Generated class for the MyVaccinationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-vaccination',
  templateUrl: 'my-vaccination.html',
})
export class MyVaccinationPage {
  mychiled:child =new child();
  listofchildvacc:child_vaccinations[]=[];
  thischildvac:child_vaccinations[]=[];
  allvaccination:Vaccination[]=[];
  vacclist:Array<{v:Vaccination,c:child_vaccinations}>=[];
 // time:Date=new Date();
   importdata:Array<{d:Date,v:Vaccination}>=[];
   loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams ,private http:Http,private loadingCtrl: LoadingController) {
   this.mychiled=this.navParams.data;
   console.log(this.mychiled);
   this.loader.present();
   this.getlistofvaccination();
  }

  ionViewDidLoad() {
    console.log('=================================ابوس ايدك اطبع صح ');
    console.log(this.mychiled);
  }


  getlistofvaccination(){
    this.http.get(SERVER_IP +'vaccination')
      .map((response :Response) => response.json())
      .subscribe(
        (data) =>{
          for(var key in data){
          var temp:Vaccination= data[key];
          this.allvaccination.push(temp);
          }
          console.log('==============================list of vacc');
          console.log(this.allvaccination);
          this.getmychildtestvaccination();
        }
      );
  }

  getmychildtestvaccination(){
    this.http.get(SERVER_IP +'child_vaccinations')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:child_vaccinations = data[key];
        this.listofchildvacc.push(temp);
        }
        console.log('=================> all children vacc')
        console.log(this.listofchildvacc)
        this.listofchildvacc.forEach(c => {
          if(this.mychiled.id == c.child_id){
            this.thischildvac.push(c);
          }
          });
        console.log('=================> mychilds vaccs')
        console.log(this.thischildvac)
        this.mapping();
      }
    );
    
  }
  mapping(){
    this.allvaccination.forEach(vac=>{
      this.thischildvac.forEach(chilled=>{
        if(vac.id==chilled.vacc_id){
         const time:Date=new Date(chilled.time);
          //this.time=new Date(chilled.time);
          this.vacclist.push({v:vac,c:chilled});
          this.importdata.push({d:time,v:vac});
          console.log('=================> المااااااابينج')
          console.log(this.importdata)
          console.log(this.vacclist)
        }
      });
    });
    this.loader.dismiss();
  }


}
