import { storiesreading } from './../../Models/storiesreading';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { stories } from '../../Models/stories';

/**
 * Generated class for the StoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams ,private menuCtrl:MenuController
              ,private http:Http,private loadingCtrl: LoadingController,private alertCtrl:AlertController) {
    menuCtrl.enable(true);
    this.loader.present();
    this.getallstories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoriesPage');
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
  choosechild(story,readings:string[]){
    var allreadinglist:storiesreading[]=this.whoreaded;
    this.navCtrl.push('SessionchildPage',{story,readings,allreadinglist})
    console.log('clicked')
  }
  //============================== get stories ==================================
  allstories:stories[]=[];
  getallstories(){
    try {
      this.http.get(SERVER_IP +'stories')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:stories= data[key];
        this.allstories.push(temp);
        
        }
        console.log('==============================allstories')
        console.log(this.allstories)
        this.getallwhoreaded();
      }
    );
    } catch (error) {
      console.log(error)
      this.loader.dismiss();
      this.showAlertError();
    }
  }

  whoreaded:storiesreading[]=[];
  getallwhoreaded(){
    try {
      this.http.get(SERVER_IP +'storiesreading')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp: storiesreading= data[key];
        this.whoreaded.push(temp);
        
        }
        console.log('==============================whoreaded')
        console.log(this.whoreaded)
        this.mappingwithreading()
      }
    );
    } catch (error) {
      console.log(error)
      this.loader.dismiss();
      this.showAlertError();
    }
  }

  showlist:Array<{s:stories,r:storiesreading[]}>=[];
  mappingwithreading(){
    //mapping each stroy with it`s list of whoreading
    this.allstories.forEach(story => {
      var reading:storiesreading[]=[];
      this.whoreaded.forEach(r => {
        if(story.id == r.story_id){
          reading.push(r);
        }
      });
      this.showlist.push({s:story,r:reading});
    });
    console.log('final list to showing');
    console.log(this.showlist);
    this.initializelist();
    this.loader.dismiss();
  }

  searchliststories:Array<{s:stories,r:storiesreading[]}>=[];
  initializelist() {
    this.searchliststories = this.showlist;
  }

  getItemsofstories(ev:any){
    this.initializelist();
    var searchlist:Array<{s:stories,r:storiesreading[]}>=[];
    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log(val);
    // if the value is not an empty string filter the items
    if (val && val.trim() != '') {
       this.searchliststories.filter((item) => {
        if(item.s.title.includes(val)){
          searchlist.push(item);
        }
      })
      
      this.searchliststories = searchlist
    }
    else{
      // if the value is an empty string don't filter the items
      this.initializelist();
    }
  console.log(this.searchliststories);
  }
}
