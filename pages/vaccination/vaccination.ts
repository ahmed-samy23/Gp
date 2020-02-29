import { Http, Response } from '@angular/http';
import { Vaccination } from './../../Models/vaccination';
import { SERVER_IP } from './../../Models/connection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the VaccinationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vaccination',
  templateUrl: 'vaccination.html',
})
export class VaccinationPage {
  allvaccination:Vaccination[]=[];
  select1:number=3;
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController
              ,private http:Http,private loadingCtrl: LoadingController,private alertCtrl:AlertController) {
    this.menuCtrl.enable(true);
    this.loader.present();
    this.getallvaccination();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaccinationPage');
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

  getallvaccination(){
    try {
      this.http.get(SERVER_IP +'vaccination')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:Vaccination= data[key];
        this.allvaccination.push(temp);
        
        }
        console.log('==============================vacc')
        console.log(this.allvaccination)
        this.inititem();
        this.loader.dismiss();
      }
    );
    } catch (error) {
      console.log(error)
      this.loader.dismiss();
      this.showAlertError();
    }
  }
  searchvacc:Vaccination[]=[];
inititem(){
this.searchvacc=this.allvaccination;

}

  filtervacc(ev:any){
    //let val = ev.target.value;
    console.log(" all vacc ya hema")
    console.log(Number(this.select1))
    var searchlist:Vaccination[]=[];
    if (Number(this.select1)==1)
    {
      this.allvaccination.filter((item) => {
        if((item.Type==1)){
          searchlist.push(item);
            }
        });
        this.searchvacc=searchlist;
    }
    else if (Number(this.select1)==2)
    {
      this.allvaccination.filter((item) => {
        if((item.Type==Number(this.select1))){
          searchlist.push(item);
            }
            
        });
        this.searchvacc=searchlist;
        console.log(this.searchvacc)
    }
    else{this.inititem();}
  }
  fo
}
