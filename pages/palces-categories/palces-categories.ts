import { Http, Response } from '@angular/http';
import { places_catigory } from './../../Models/places_catigory';
import { SERVER_IP } from './../../Models/connection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the PalcesCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-palces-categories',
  templateUrl: 'palces-categories.html',
})
export class PalcesCategoriesPage {

  placescategorylist:places_catigory[]=[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController
              , private http:Http,private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(true);
    this.loader.present();
    this.getplacescategorylist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PalcesCategoriesPage');
  }

  goToPlaces(id:number){
    this.navCtrl.push('PlacesPage',id);
  }
  menubutton(){
    this.menuCtrl.open();
  }
//====================================
getplacescategorylist(){
  this.http.get(SERVER_IP + 'places_catigory')
  .map((response :Response) =>{
    return response.json()
  }).subscribe(
    //(data) => this.visitorslist.push(data)
    (data) => {
      for(var key in data){
      var temp:places_catigory = data[key];
      this.placescategorylist.push(temp);
    }
    console.log('placescategorylist');
    console.log(this.placescategorylist);
    console.log('======================================');
    this.initializeicons();
  }
  );
}
initializeicons(){
  var iconlist:Array<{id:number ,name:string , color:string}>=[
    {id:1,name:'bicycle',color:'green'},
    {id:2,name:'football',color:'black'},
    {id:3,name:'book',color:'cornflowerblue'},
    {id:4,name:'help-buoy',color:'darkgray'},
    {id:5,name:'heart',color:'red'},
    {id:6,name:'body',color:'cadetblue'},
    {id:7,name:'heart',color:'pink2'},
    {id:8,name:'heart',color:'red'}
  ]
  this.placescategorylist.forEach(element1 => {
    iconlist.forEach(element2 => {
      if(element1.id == element2.id){
        element1.iconName = element2.name;
        element1.iconColor = element2.color;
      }
    });
    
  });
  console.log('placescategorylist aftr icon');
  console.log(this.placescategorylist);
  console.log('======================================');
  this.loader.dismiss();
}

}
