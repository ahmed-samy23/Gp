import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { articles_category } from '../../Models/articles_category';
import { artical } from '../../Models/artical';
import { doctor } from '../../Models/doctor';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
/**
 * Generated class for the DoctorListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-list',
  templateUrl: 'doctor-list.html',
})
export class DoctorListPage {
  allarticle:artical[]=[];
  alldoctor:doctor[]=[];
  nedd:artical[]=[];
 cat : articles_category =new articles_category();
 loader = this.loadingCtrl.create({
  content: "Please wait...",
  duration: 10000
});
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl:LoadingController) {
            this.cat=this.navParams.data;
            console.log('=======> artival category');
            console.log(this.cat);
            this.loader.present();
            this.getallart();
          }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorListPage');
  }
  gotoarticle(doca:doctor,arta:artical[]){
    this.navCtrl.push('ListArticlePage',{doca,arta})
  }
//====================== get data ===================================================
  getallart(){
    this.http.get(SERVER_IP+'article')
    .map((response:Response)=>response.json())
    .subscribe(
      (data)=>{
        for(var key in data){
          var temp:artical = data[key];
          this.allarticle.push(temp);
          }
          console.log('============print allartical')
          console.log(this.allarticle)
          this.allarticle.forEach(c => {
            if(this.cat.id == c.type){
              this.nedd.push(c);
            }
           console.log('============print nedss')
           console.log(this.nedd)
            });
            this.getdoctorlist();
      });}

      getdoctorlist(){
        this.http.get(SERVER_IP+'doctor')
        .map((response:Response)=>response.json())
        .subscribe(
          (data)=>{
            for(var key in data){
              var temp:doctor = data[key];
              this.alldoctor.push(temp);
              }
              console.log('============print all doctor')
              console.log(this.alldoctor)
              this.mapping();
          }
        );
      }
      status:boolean =false;
      artlist2:Array<{d:doctor,a:artical[]}>=[];
      mapping(){
        if(this.nedd.length > 0){
          this.alldoctor.forEach(doc=>{
            var arr:artical[]=[];
            this.nedd.forEach(art=>{
              if(doc.id==art.doctor_id){
                arr.push(art);
              }
            });
            this.artlist2.push({d:doc,a:arr});
          });
          console.log('=================> المااااااابينج')
          console.log(this.artlist2)
          this.status=true;
          this.loader.dismiss();
        }else{
          this.status=false;
          this.loader.dismiss();
        }
      
      }
}
