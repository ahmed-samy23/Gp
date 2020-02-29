import { Http, Response } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';
import { OrderDetails } from './../../Models/OrderDetails';
import { product } from './../../Models/product';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ModalController, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController 
                ,private alertctrl:AlertController ,private modalCtrl:ModalController,private http:Http
                , private actionsheetCtrl:ActionSheetController,public toastCtrl: ToastController
                ,private loadingCtrl: LoadingController) {
                this.menuCtrl.enable(true);
                  this.loader.present();
                  this.allproduct();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  menubutton(){
    this.menuCtrl.open();
  }
  showAlertError() {
    let alert = this.alertctrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }

  openorderdetails(){
    
    var myproducts:product[] = this.orderproducts;
    var mydateils:OrderDetails[]= this.Details;
    this.navCtrl.push('OrderdetailsPage',{myproducts,mydateils})
  }

  alertinfo(){
    this.alertctrl.create({
      title:'ارشادات هامه',
      subTitle:'يمكنك اختيار اكتر من منتج فى نفس الطلب عن طريق زر "طلب" .. ومن ثم بعد الانتهاء الضغط على زر "ارسال الطلب" وتأكيده',
      buttons:[
        {
          text: '!!فهمت',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }

  ifquan(prod:product,q:number,index:number){
    if(prod.Quantity >= q && prod.Quantity!= 0 && q > 0){
      this.addtolist(prod,q,index);
    }else{
      console.log('sorry maxmum quantity is ' + prod.Quantity +' and minimum quantity is shoud be biger than 0');
      let alert = this.alertctrl.create({
        title: 'لا يمكن تنفيذ طلبك',
        subTitle: 'نأسف لك الكمية المطلوبه اكبر من المخزون..أقصى كمية ممكنه هى ' + prod.Quantity,
        buttons: ['!!حسنــا']
      });
      alert.present();
    }
  }
  enterquantity(pro:product,index:number){
    let prompt = this.alertctrl.create({
      title: 'تحديد الكمية',
      message: "لقد اخترت عمل طلب من " + pro.name +" ... من فضلك حدد الكمية المراد شرائها منه",
      inputs: [
        {
          name: 'quantity',
          placeholder: 'الكمية',
        },
      ],
      buttons: [
        {
          text: 'موافق',
          handler: data => {
            if(data.quantity == ''){
              console.log('empty quantity')
            }else if( !isNaN(Number(data.quantity)) ){
                var quan:number = Number(data.quantity);
                console.log(JSON.stringify(data)); //to see the object
                console.log(quan);
                console.log('Saved clicked');
                //here function add product in order with quantity
                this.ifquan(pro,quan,index);
            }else{
              console.log('string can not conver to num')
              let alert = this.alertctrl.create({
                title: 'خطأ فى الكمية المطلوبة',
                subTitle: 'يرجى ادخال الكمية المطلوبة عبارة عن ارقام فقط بدون اى احرف او علامات ترقيمية',
                buttons: ['!!حسنــا']
              });
              alert.present();
            }
          }
        },
        {
          text: 'الغاء',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
        prompt.present();

  }

  presentModal(prod:product) {
    console.log(prod)
    let modal = this.modalCtrl.create('ProductdetailsmodalPage',prod);
    modal.present();
  }
  //pro:product=new product();
  openOptions(pro:product,index:number) {
    /*pro.id = 1;
    pro.name='دبدوب صغير';
    pro.photo = 'p2.jpg';
    pro.price = 10;
    pro.Quantity=100;
    pro.description = 'دبدوب صغير بنى اللون...لا يصدر اصوات ..متوافر منه جميع الالوان..مع عرض خاص اطل دبدوبين واحصل على الثالث مجانا'
    */let actionSheet = this.actionsheetCtrl.create({
      title: 'الاختيارت',
      buttons: [
        {
          text: 'التفاصيــل',
          handler: () => {
            this.presentModal(pro);
          }
        },
        {
          text: 'اضافة لسلة المشتريات',
          handler: () => {
            this.enterquantity(pro,index)
            console.log('Play clicked');
          }
        },
        {
          text: 'حذف من السلة',
          role: 'destructive',
          handler: () => {
            this.deletefromlist(pro,index)
            console.log('Favorite clicked');
          }
        },
        {
          text: 'الغاء الاختيارات',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
}
//========================== get products =========================================
allproducts:product[]=[];
  allproduct(){
    try {
      this.http.get(SERVER_IP + 'product')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) =>  {
          for(var key in data){
          var temp:product = data[key];
          this.allproducts.push(temp);
        }
        console.log('=======> this.allproducts');
        console.log(this.allproducts);
        this.loader.dismiss();
        });
    } catch (error) {
      this.showAlertError();
      this.loader.dismiss();
      console.log(error);
    }
  }
//========================== add item =============================================
orderproducts:product[]=[];
Details:OrderDetails[]=[];
addtolist(prod:product,q:number,index:number){
  console.log(product);
  console.log(q);
  this.orderproducts[index]=prod;
  console.log(this.orderproducts);
  var D:OrderDetails=new OrderDetails();
  D.product_id = prod.id;
  D.quantity = q;
  console.log('order details');
  console.log(D);
  this.Details[index] = D;
  console.log(this.Details);
  const toast = this.toastCtrl.create({
    message: 'تم اضافة المنتج الى سلة المشتريات',
    duration: 2000
  });
  toast.present();
  this.ifdisablebutton();
  }
  //=========================== delete item ===========================================
  deletefromlist(pro:product,index:number){
    var ifdelete:number = 0;
    this.Details.forEach(element => {
      if(element.product_id == pro.id){
        ifdelete ++;
      }
    });
    if(ifdelete > 0){
      this.orderproducts = this.orderproducts.filter(obj => obj !== pro);
      console.log(this.orderproducts);
      this.Details = this.Details.filter(obj => obj.product_id !== pro.id);
      console.log(this.Details);
      const toast = this.toastCtrl.create({
        message: 'تم حذف المنتج من سلة المشتريات',
        duration: 2000
      });
      toast.present();
      this.ifdisablebutton();
    }else{
      console.log('this item don`t choosed before');
      let alert = this.alertctrl.create({
        title: 'لا يمكنك تنفيذ طلبك',
        subTitle: 'لا يمكن حذف هذا المنتج من السلة لانك لم تضفه بعد',
        buttons: ['!!حسنــا']
      });
      alert.present();

    }
  }
  //======================================================================================
  disable:boolean=true;
  ifdisablebutton(){
    if(this.Details.length > 0){
      this.disable = false;
    }else{
      this.disable = true;
    }
  }
}