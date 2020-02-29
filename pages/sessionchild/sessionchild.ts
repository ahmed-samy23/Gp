import { SERVER_IP } from './../../Models/connection';
import { Http, Response } from '@angular/http';
import { child } from './../../Models/child';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { stories } from '../../Models/stories';
import { storiesreading } from '../../Models/storiesreading';

/**
 * Generated class for the SessionchildPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sessionchild',
  templateUrl: 'sessionchild.html',
})
export class SessionchildPage {
  childrenlist:child[]=[];
  mychildrenlist:child[]=[];
  statu:boolean = false;
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  mystory:stories;
  readings: storiesreading[]=[];
  allreading:storiesreading[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl: LoadingController) {
    this.loader.present();
    this.mystory = this.navParams.get('story');
    this.readings= this.navParams.get('readings');
    this.allreading =this.navParams.get('allreadinglist');
    console.log('=========== data sending story and array ===========');
    console.log(this.mystory)
    console.log(this.readings)
    console.log(this.allreading)
    this.mychildreninfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionchildPage');
  }
  readstory(c:child){
    var mystory:stories = this.mystory;
    var allreadinglist:storiesreading[]=this.allreading;
    this.navCtrl.push('StoryscriptPage',{c,mystory,allreadinglist});
  }

  mychildreninfo(){
    
      this.http.get(SERVER_IP + 'child')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) =>  {
          for(var key in data){
          var temp:child = data[key];
          this.childrenlist.push(temp);
        }
        console.log('=======> this.childrenlist');
        console.log(this.childrenlist);
        this.childrenlist.forEach(c => {
          if(Number(localStorage.getItem('session')) == c.visitor_id){
            this.mychildrenlist.push(c);
          }
        });
        console.log('=======> this.mychildrenlist');
        console.log(this.mychildrenlist);
        this.havechild(this.mychildrenlist);
        }
      );
     
  }

  havechild(mychildrenlistget:child[]){
    if(mychildrenlistget.length > 0){
      this.statu = true; 
      this.loader.dismiss();
    }else{
      this.statu = false;
      this.loader.dismiss();
    }
  }

}
