import { OrderDeliver } from './../../Models/OrderDeliver';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { OrderDetails } from '../../Models/OrderDetails';
import { Orders } from '../../Models/Orders';
import { product } from '../../Models/product';

/**
 * Generated class for the BillDetailesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-detailes',
  templateUrl: 'bill-detailes.html',
})
export class BillDetailesPage {

  alorderd:OrderDetails[]=[];
  myorder:OrderDetails[]=[];
  alldriv:OrderDeliver[]=[];
  allproduct:product[]=[];
  detailes:Array<{o:OrderDetails,p:product}>=[];
  drivery:OrderDeliver=new OrderDeliver();
  or:Orders=new Orders();
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 20000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private loadingCtrl: LoadingController) {
    console.log('its my Order')
    this.or=this.navParams.data;
    console.log(this.or);
    this.loader.present();
    this.loadorderdrive();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillDetailesPage');
  }


  loadorderdrive(){
    this.http.get(SERVER_IP +'OrderDelivery')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:OrderDeliver = data[key];
        this.alldriv.push(temp);
        }
        console.log('================all drivery')
        console.log(this.alldriv)
        this.alldriv.forEach(c => {
          if(this.or.id==c.IdOrder){
            this.drivery=c;
            console.log('================its drivery')
            console.log(this.drivery)
          }
        });  
      this.getlistorder();
      }
    );
  }
  


  getlistorder(){
    this.http.get(SERVER_IP +'OrderDetails')
    .map((response :Response) => response.json())
    .subscribe(
      (data) =>{
        for(var key in data){
        var temp:OrderDetails = data[key];
        this.alorderd.push(temp);
        }
        console.log('================all order')
        console.log(this.alorderd)
        this.alorderd.forEach(c => {
          if(this.or.id==c.order_id){
            this.myorder.push(c);
          }
        });
        console.log('=======> this.myorder');
        console.log(this.myorder);
        this.loadallproduct();
      }
    );
  }
loadallproduct(){
  this.http.get(SERVER_IP +'product')
  .map((response :Response) => response.json())
  .subscribe(
    (data) =>{
      for(var key in data){
      var temp:product = data[key];
      this.allproduct.push(temp);
      }
      console.log('================all product')
      console.log(this.alorderd)
      this.mapping();
    }
  );
}
totalcosts:number=0;
mapping(){
  this.allproduct.forEach(pro=>{
    this.myorder.forEach(ord=>{
      if(pro.id==ord.product_id){
      
        this.detailes.push({o:ord,p:pro});
        
      }
    });
  });
  console.log('=================> المااااااابينج')
  console.log(this.detailes);
  this.totalcosts = this.or.total_cost;
  this.loader.dismiss();
}

}
