import { doctor } from './../../Models/doctor';
import { clinic } from './../../Models/clinic';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { places } from '../../Models/places';

/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  place_id:number;
  ifclinic:boolean =false;
  placeslist:places[]=[];
  showplaceslist:places[]=[];
  clinicslist:clinic[]=[];
  doctorslist:doctor[]=[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  showcliniclist:Array<{d:doctor,c:clinic}>=[];
  select1:string='all'; select2:string='';
  optionsofcity:string[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http
                ,private loadingCtrl: LoadingController,private modalCtrl:ModalController ) {
    this.place_id = this.navParams.data;
    console.log("this.place_id= "+ this.place_id)
    this.loader.present();
    this.chickplace();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  }

  presentModal(person:any,type:number) {
    let modal = this.modalCtrl.create('ProfileUserModalPage',{person , type});
    modal.present();
  }
  //================ load data ===================
  chickplace(){
    if(this.place_id == 7){ //clinic
      //alert that only our doctors
      //loading...
      this.ifclinic = true;
      this.getclinicslist();
    }else{
      this.ifclinic = false;
      this.getplaceslist();
    }
  }

  getplaceslist(){
    this.http.get(SERVER_IP + 'places')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:places = data[key];
        this.placeslist.push(temp);
      }
      this.placeslist.forEach(element => {
        if(element.catigory_id == this.place_id){
          this.showplaceslist.push(element);
        }
      });
      console.log('this.showplaceslist');
      console.log(this.showplaceslist);
      console.log('======================================');
      this.initializeItems();
      this.loader.dismiss();
    }
    );
  }

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
      this.getdocotrslist();
    }
    );
  }

  getdocotrslist(){
    this.http.get(SERVER_IP + 'doctor')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:doctor = data[key];
        this.doctorslist.push(temp);
      }
      console.log('this.doctorslist');
      console.log(this.doctorslist);
      console.log('======================================');
      this.clinicslist.forEach(clinic => {
        this.doctorslist.forEach(doctor => {
          if(clinic.doc_id ==doctor.id){
            this.showcliniclist.push({d:doctor , c:clinic});
          }
        });
      });
      console.log('this.showcliniclist');
      console.log(this.showcliniclist);
      console.log('======================================');
      this.initializeItems();
      this.loader.dismiss();
    }
    );
  }
//================= search functions ==================

search_showplaceslist:places[]=[];
search_showcliniclist:Array<{d:doctor,c:clinic}>=[];
initializeItems() {
  this.search_showplaceslist = this.showplaceslist;
  console.log('================initial place=======================');
  console.log(this.search_showplaceslist)
  console.log('=======================================');
  this.search_showcliniclist = this.showcliniclist;
  console.log('================initial clinic=======================');
  console.log(this.search_showcliniclist)
  console.log('=======================================');
}

filterplaces(ev: Event){

  var searchlist:places[]=[]
  console.log('=======================================');
  console.log('===> select1');
  console.log(this.select1)
  console.log('===> select2');
  console.log(this.select2);
  console.log('=======================================');
  if(this.select1 == 'all'){
    if (this.select2 != ''){
      this.showplaceslist.filter((item) => {
        if(item.city.includes(this.select2)){
          searchlist.push(item);
            }
        })
      this.search_showplaceslist = searchlist;
      console.log('================= '+ this.select2 +' ======================');
      console.log(this.search_showplaceslist)
      console.log('=======================================');
      }
      else{
        // if the value is an empty string don't filter the items
        this.initializeItems();
      }
  }else{
    if (this.select2 != ''){
      this.showplaceslist.filter((item) => {
        if(item.govern.includes(this.select1) && item.city.includes(this.select2)){
          searchlist.push(item);
            }
        })
      this.search_showplaceslist = searchlist;
      console.log('================= '+ this.select2 +' ======================');
      console.log(this.search_showplaceslist)
      console.log('=======================================');
      }
      else{
        this.showplaceslist.filter((item) => {
          if(item.govern.includes(this.select1)){
            searchlist.push(item);
              }
          })
          this.search_showplaceslist = searchlist;
          console.log('================= '+ this.select1 +' ======================');
          console.log(this.search_showplaceslist)
          console.log('=======================================');
      }
    
  }
  
}

filterclinics(ev: Event){
  var searchlist:Array<{d:doctor,c:clinic}>=[];
  console.log('=======================================');
  console.log('===> select1');
  console.log(this.select1)
  console.log('===> select2');
  console.log(this.select2);
  console.log('=======================================');
  if(this.select1 == 'all'){
    if (this.select2 != ''){
      this.showcliniclist.filter((item) => {
        if(item.c.city.includes(this.select2)){
          searchlist.push(item);
            }
        })
      this.search_showcliniclist = searchlist;
      console.log('================= '+ this.select2 +' ======================');
      console.log(this.search_showcliniclist)
      console.log('=======================================');
      }
      else{
        // if the value is an empty string don't filter the items
        this.initializeItems();
      }
  }else if(this.select1 == 'اخرى'){
    if (this.select2 != ''){
      this.showcliniclist.filter((item) => {
        if((!item.c.govern.includes('القاهرة') && !item.c.govern.includes('الجيزة'))  && item.c.city.includes(this.select2)){
          searchlist.push(item);
            }
        })
      this.search_showcliniclist = searchlist;
      console.log('================= '+ this.select2 +' ======================');
      console.log(this.search_showcliniclist)
      console.log('=======================================');
      }
      else{
        this.showcliniclist.filter((item) => {
          if(!item.c.govern.includes('القاهرة') && !item.c.govern.includes('الجيزة')){
            searchlist.push(item);
              }
          })
          this.search_showcliniclist = searchlist;
          console.log('================= '+ this.select1 +' ======================');
          console.log(this.search_showcliniclist)
          console.log('=======================================');
      }
  }else{
    if (this.select2 != ''){
      this.showcliniclist.filter((item) => {
        if(item.c.govern.includes(this.select1) && item.c.city.includes(this.select2)){
          searchlist.push(item);
            }
        })
      this.search_showcliniclist = searchlist;
      console.log('================= '+ this.select2 +' ======================');
      console.log(this.search_showcliniclist)
      console.log('=======================================');
      }
      else{
        this.showcliniclist.filter((item) => {
          if(item.c.govern.includes(this.select1)){
            searchlist.push(item);
              }
          })
          this.search_showcliniclist = searchlist;
          console.log('================= '+ this.select1 +' ======================');
          console.log(this.search_showcliniclist)
          console.log('=======================================');
      }
    
  }

}

}
