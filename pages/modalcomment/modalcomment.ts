import { doctor } from './../../Models/doctor';
import { visitor } from './../../Models/visitor';
import { SERVER_IP } from './../../Models/connection';
import { comment } from './../../Models/comment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { post } from './../../Models/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';

/**
 * Generated class for the ModalcommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalcomment',
  templateUrl: 'modalcomment.html',
})
export class ModalcommentPage {
  mypost:post;
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  loader5 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  loader6 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  coms:comment[]=[];
  allvisitors:visitor[]=[];
  alldoctors:doctor[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams ,private viewctrl:ViewController
    ,private loadingCtrl: LoadingController,private http:Http,private alertCtrl:AlertController
    ,public toastCtrl: ToastController, private modalCtrl:ModalController) {
    this.mypost = this.navParams.get('p');
    this.coms = this.navParams.get('coms');
    this.allvisitors =this.navParams.get('visitors');
    this.alldoctors =this.navParams.get('doctors');
    this.newcomment.comment1='';
    console.log('=========> my data');
    console.log(this.mypost);
    console.log(this.coms);
    console.log(this.allvisitors);
    console.log(this.alldoctors);
    this.loader.present();
    this.iffound();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalcommentPage');
  }

  dismiss(){
    this.viewctrl.dismiss();
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  //========================= get visitors ============================
  myvisitors:visitor[]=[];
  getvisitors(){
    this.coms.forEach(c => {
      this.allvisitors.forEach(element => {
        if(element.id == c.user_id && c.user_type == 2){    // change type
          this.chickv(element);
        }
      });
    });
    console.log('=======> this.myvisitors');
    console.log(this.myvisitors);
    this.getdoctors();
  }
  chickv(e:visitor){
    var s:number = 0;
    this.myvisitors.forEach(element => {
      if(element.id == e.id){
        s++;
      }
    });
    if(s==0){
      console.log('================================= hndifh =============================>')
      console.log(s)
      this.myvisitors.push(e);
    }else{
      console.log('================================= m4 hndifh =============================>')
      console.log(s)
    }
  }
  //========================================
  mydoctors:doctor[]=[];
  getdoctors(){
    this.coms.forEach(c => {
      this.alldoctors.forEach(element => {
        if(element.id == c.user_id && c.user_type == 3){    // change type
          this.chickd(element);
        }
      });
    });
    console.log('=======> this.mydoctors');
    console.log(this.mydoctors);
    this.mappingtouser();
  }
  chickd(e:doctor){
    var s:number = 0;
    this.mydoctors.forEach(element => {
      if(element.id == e.id){
        s++;
      }
    });
    if(s==0){
      console.log('================================= hndifh =============================>')
      console.log(s)
      this.mydoctors.push(e);
    }else{
      console.log('================================= m4 hndifh =============================>')
      console.log(s)
    }
  }
  //===================== mapping ===========================
  commentslist:Array<{user:any , com:comment , v:boolean}>=[];
  mycommentslist:Array<{user:any , com:comment , v:boolean , i:boolean}>=[];
  mappingtouser(){
    //this.loader4.present();
    this.coms.forEach(element => {
      console.log('in for each loop');
      console.log(element);
      if(element.user_type==2){
        console.log('====================')
        console.log(element.user_type)
        console.log('da tb3 visitor');
        this.myvisitors.forEach(e => {
          if(e.id == element.user_id){
            this.commentslist.push({user:e,com:element,v:true});
          }
        });
        console.log('out case with commentlist');
        console.log(this.commentslist)
      }else if(element.user_type==3){
        console.log('====================')
        console.log(element.user_type)
        console.log('da tb3 doctoe');
        this.mydoctors.forEach(e => {
          if(e.id == element.user_id){
            this.commentslist.push({user:e,com:element,v:false});
          }
        });
        console.log('out case with commentlist');
        console.log(this.commentslist)
      }else if(element.user_type==1){
        console.log('====================')
        console.log(element.user_type)
        console.log('da tb3 admin');
        var e:{
          first_name:string,
          last_name:string,
          photo :string
        }={
          first_name:'Admin',
          last_name:'',
          photo :'a.jpg'
        }
        this.commentslist.push({user:e,com:element,v:true});
        console.log('out case with commentlist');
        console.log(this.commentslist)
      }
    });
    console.log('=============== commentslist with user =====================');
    console.log(this.commentslist);
    this.commentslist.forEach(element => {
      console.log('if for looop')
      console.log(element.user.id)
      console.log(element.com.user_type)
      console.log(Number(window.localStorage.getItem('session')));
      if( (element.com.user_id == Number(window.localStorage.getItem('session')) && element.com.user_type == 2) ){
        this.mycommentslist.push({user:element.user , com:element.com , v:element.v , i:true});
      }else{
        this.mycommentslist.push({user:element.user , com:element.com , v:element.v , i:false});
      }
    });
    console.log('=============== mycommentslist with user =====================');
    console.log(this.mycommentslist);
    this.loader.dismiss();
  }
  //=============================================
  status:boolean=false;
  iffound(){
    if(this.coms.length > 0){
      this.getvisitors();
      this.status = true;
    }else{
      this.status = false;
      this.loader.dismiss();
    }
  }
  //========================= add comments ============================
  newcomment:comment=new comment();
  addnewcomment(){
    console.log('========> in funcyion add http ');
    if(this.newcomment.comment1 == ''){
      console.log('=============> new comment ')
      console.log(this.newcomment.comment1);
      let alert2 = this.alertCtrl.create({
        title: '!!بيانات غير مكتملة',
        subTitle: 'من فضلك ادخل التعليق الذى تريده اولا',
        buttons: ['!!حسنــا']
      });
      alert2.present();
    }else{
      this.newcomment.user_id = Number(window.localStorage.getItem('session'));
      this.newcomment.user_type = 2 ; // change type
      this.newcomment.post_id = this.mypost.id;
      console.log('=============> new comment ')
      console.log(this.newcomment);
    var c:Response;
    this.loader5.present();
    try {
      this.http.post(SERVER_IP +'comment',this.newcomment)
    .subscribe(
      (data) =>{
        c = data
        console.log('========> el response ')
        console.log(c)
        if(c.status == 201 ){
          const toast = this.toastCtrl.create({
            message: 'تم اضافة التعليق بنجاح',
            duration: 4000
            });
            this.loader5.dismiss();
            toast.present();
            this.dismiss();
            //this.navCtrl.setRoot('PostsPage');
        }
      } 
    );
    } catch (error) {
      console.log(error);
      this.loader5.dismiss();
      this.showAlertError();
    }
    }
  }
  //========================= delete comments ============================
  deletecomment(comID:number){
    this.loader6.present();
    try {
      const headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    
    let options = new RequestOptions({ headers : headers});
    this.http.delete(SERVER_IP + 'comment'+'?id=' + comID ,options)
    .subscribe(
      (data) => {
        console.log(data);
        if(data.status == 200){
          console.log('=========================> delete comment succesfully')
          let toast = this.toastCtrl.create({
            message: '!! تم حذف تعليقك بنجـــاح ',
            duration: 4000
          });
          this.loader6.dismiss();
          this.viewctrl.dismiss();
          toast.present();
          //this.navCtrl.setRoot('PostsPage');
        }else{
          this.loader6.dismiss();
          console.log('error in delete child')
        }
    });
    } catch (error) {
      this.showAlertError();
      console.log(error);
    }
  }
  
  
}
