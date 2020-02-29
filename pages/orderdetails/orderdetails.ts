import { SERVER_IP } from './../../Models/connection';
import { OrderDeliver } from './../../Models/OrderDeliver';
import { Http } from '@angular/http';
import { OrderDetails } from './../../Models/OrderDetails';
import { product } from './../../Models/product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Orders } from '../../Models/Orders';

/**
 * Generated class for the OrderdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderdetailsPage {
  lablestatue:boolean =false;
  myproducts:product[] = [];
  mydateils:OrderDetails[]= [];
  neworder:Orders=new Orders();
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  neworderdelivery:OrderDeliver=new OrderDeliver();
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl: LoadingController
    ,public toastCtrl: ToastController,private alertctrl:AlertController,private http:Http) {
    //lazm a3ml add llorder elawl wakml beh bianat el details
    this.mydateils = this.navParams.get('mydateils');
    this.myproducts = this.navParams.get('myproducts');
    console.log('============== data sending ==========');
    console.log(this.mydateils);
    console.log(this.myproducts);
    this.loader.present();
    this.neworderdelivery.Address='';
    this.neworderdelivery.MetroStation='';
    this.neworderdelivery.PhoneNumber='';
    this.mappingtoprice();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailsPage');
  }

  cansel(){
    this.navCtrl.pop();
  }
  showAlertError() {
    let alert = this.alertctrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  //============================================
  mydateilslist:{order:OrderDetails,pro:product,totalprice:number}[]= [];
  totalcosts:number =0;
  mappingtoprice(){
    this.myproducts.forEach(m => {
      this.mydateils.forEach(o => {
        if(m.id == o.product_id){
          var total:number = m.price * o.quantity
          this.mydateilslist.push({order:o,pro:m,totalprice:total});
        }
      });
    });
    console.log('===============mapping with products and price =================');
    console.log(this.mydateilslist);
    this.mydateilslist.forEach(element => {
      this.totalcosts += element.totalprice;
    });
    this.loader.dismiss();
  }
  //==============================================================
  alert_to_valid(){
    if( (this.neworderdelivery.PhoneNumber !='' && this.neworderdelivery.MetroStation !='' && this.neworderdelivery.Address !='') ){
      if(!isNaN(Number(this.neworderdelivery.PhoneNumber))){
        let confirm = this.alertctrl.create({
          title: 'تأكيد طلبـك',
          message:'هل انت متأكد من الرغبة فى عمل هذا الطلب للشراء',
          buttons: [
            {
              text: '!!الغاء',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: '!!موافق',
              handler: () => {
                console.log('ok clicked');
                console.log(this.neworderdelivery);
                console.log(this.mydateils);
                this.makeorder();
              }
            }
          ]
        });
        confirm.present();
      }else{
        console.log('not number')
        let alert = this.alertctrl.create({
          title: 'بيانات غير مكتملة',
          subTitle: 'من فضلك ادخل العنوان ورقم التليفون بشكل صحيح واقرب محطة مترو ترغب فالاستلام بها..جميعم مطلبات اساسية',
          buttons: ['!!حسنــا']
        });
        alert.present();
      }
    }else{
      let alert = this.alertctrl.create({
        title: 'بيانات غير مكتملة',
        subTitle: 'من فضلك ادخل العنوان ورقم التليفون بشكل صحيح واقرب محطة مترو ترغب فالاستلام بها..جميعم مطلبات اساسية',
        buttons: ['!!حسنــا']
      });
      alert.present();
    }
  }
  lengthoflist:number =0;
  makeorder(){
    var now:Date =new Date();
    this.neworder.visitor_id = Number(window.localStorage.getItem('session'));
    this.neworder.total_cost = this.totalcosts;
    this.neworder.date= now.toString();

    console.log('============== new order =================');
    console.log(this.neworder);
    try {
      this.http.post(SERVER_IP +'Order',this.neworder)
      .subscribe(
        (data) =>{
          var c = data
          var o:Orders = c.json();
          console.log('========> el response ')
          console.log(c)
          if(c.status == 201 ){
          console.log('========> el response obj')
          console.log(o)
          this.neworderdelivery.IdOrder = o.id;
          console.log('================ المفروض بقى اروح احط الديليفيرى دا');
          console.log(this.neworderdelivery);
          this.makeorderdelivery(this.neworderdelivery);
        }
      });
    } catch (error) {
        console.log(error);
        this.showAlertError();
    }
  }
  makeorderdetails(newobj:OrderDetails,len:number){
    console.log('================ in details fun');
    try {
      this.http.post(SERVER_IP +'OrderDetails',newobj)
      .subscribe(
        (data) =>{
          var c = data
          console.log('========> el response ')
          console.log(c)
          console.log('================ length ' + this.mydateils.length);
          console.log('================ variablelist ' + this.lengthoflist);
          console.log('================ c.status ' + c.status);
          if(c.status == 201 ){
            if(this.mydateilslist.length == len){
              console.log('================  انتهى ونروح لبتاعت ابراهيم');
              const toast = this.toastCtrl.create({
                message: 'تم اضافة طلبك وسوف نتواصل معكم لتحديد الموعد',
                showCloseButton:true
              });
              toast.present();
              this.navCtrl.setRoot('ProductsPage')
            }
           };
      });
    } catch (error) {
        console.log(error);
        this.showAlertError();
    }
  }
  makeorderdelivery(newobje:OrderDeliver){
    try {
      this.http.post(SERVER_IP +'OrderDelivery',newobje)
      .subscribe(
        (data) =>{
          var c = data
          console.log('========> el response ')
          console.log(c)
          if(c.status == 201 ){
            this.mydateils.forEach(element => {
              element.order_id = newobje.IdOrder;
              console.log('========> el object details to send')
              console.log(element)
              console.log('========var before add')
              console.log(this.lengthoflist)
              this.lengthoflist = this.lengthoflist + 1;
              console.log('========var before after')
              console.log(this.lengthoflist)
              this.makeorderdetails(element,this.lengthoflist);
            });
        }
      });
    } catch (error) {
        console.log(error);
        this.showAlertError();
    }
  }
}
