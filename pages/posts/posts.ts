import { comment } from './../../Models/comment';
import { doctor } from './../../Models/doctor';
import { visitor } from './../../Models/visitor';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { SERVER_IP } from './../../Models/connection';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, LoadingController, AlertController
  , ToastController } from 'ionic-angular';
import { post } from '../../Models/post';

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  imagestatus:boolean;
  pet:string;
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 20000
  });
  loader6 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  loader8 = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams ,private menuCtrl:MenuController
              , private modalCtrl:ModalController,private loadingCtrl: LoadingController,private http:Http
              ,private alertCtrl:AlertController,public toastCtrl: ToastController) {
    this.menuCtrl.enable(true);
    this.imagestatus=false;
    this.pet='all';
    this.newpost.post1='';
    this.loader.present();
    this.allpost();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
    console.log(window.localStorage.getItem('session'));
  }
  
  menubutton(){
    this.menuCtrl.open();
  }
  presentModal(p:post,coms:comment[]) {
    var visitors:visitor[]=this.allvisitors;
    var doctors:doctor[]=this.alldoctors;
    let modal = this.modalCtrl.create('ModalcommentPage',{p,coms,visitors,doctors});
    modal.present();
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  //========================= get comments ============================
  //comments:comment[]=[];
  mycomments:comment[]=[];
  allcomment(){
    try {
      this.http.get(SERVER_IP + 'comment')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) =>  {
          for(var key in data){
          var temp:comment = data[key];
          this.mycomments.push(temp);
        }
        console.log('=======> this.comments');
        console.log(this.mycomments);
        this.getvisitors();
        }
      );
    } catch (error) {
      this.showAlertError();
      this.loader.dismiss();
      console.log(error);
    }
  }
  //============================== looding posts=============================
  allposts:post[]=[];
  allpost(){
    try {
      this.http.get(SERVER_IP + 'post')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) =>  {
          for(var key in data){
          var temp:post = data[key];
          this.allposts.push(temp);
        }
        console.log('=======> this.allposts');
        console.log(this.allposts);
        //how to sorting this list based on date
        this.allcomment();
        }
      );
    } catch (error) {
      this.showAlertError();
      this.loader.dismiss();
      console.log(error);
    }
  }
  allvisitors:visitor[]=[];
  myvisitors:visitor[]=[];
  getvisitors(){
    try {
      this.http.get(SERVER_IP + 'visitors')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) =>  {
          for(var key in data){
          var temp:visitor = data[key];
          this.allvisitors.push(temp);
        }
        console.log('=======> this.allvisitors');
        console.log(this.allvisitors);
        this.allposts.forEach(c => {
          this.allvisitors.forEach(element => {
            if(element.id == c.user_id && c.type == 2){    // change type
              this.chickv(element);
            }
          });
        });
        console.log('=======> this.myvisitors');
        console.log(this.myvisitors);
        this.getdoctors();
        }
      );
    } catch (error) {
      this.showAlertError();
      this.loader.dismiss();
      console.log(error);
    }
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
  //==============================
  alldoctors:doctor[]=[];
  mydoctors:doctor[]=[];
  getdoctors(){
    try {
      this.http.get(SERVER_IP + 'doctor')
      .map((response :Response) =>{
        return response.json()
      }).subscribe(
        (data) =>  {
          for(var key in data){
          var temp:doctor = data[key];
          this.alldoctors.push(temp);
        }
        console.log('=======> this.alldoctors');
        console.log(this.alldoctors);
        this.allposts.forEach(c => {
          this.alldoctors.forEach(element => {
            if(element.id == c.user_id && c.type == 3){    // change type
              this.chickd(element);
            }
          });
        });
        console.log('=======> this.mydoctors');
        console.log(this.mydoctors);
        this.mappingtouser();
        }
      );
    } catch (error) {
      this.showAlertError();
      this.loader.dismiss();
      console.log(error);
    }
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
  //==================================================
  postslist:Array<{user:any , p:post ,com:comment[], v:boolean , image:boolean}>=[];
  mypostslist:Array<{user:any , p:post,com:comment[], image:boolean}>=[];
  myInfo:visitor=new visitor();
  mappingtouser(){
    this.allposts.forEach(element => {
      var d:Date=new Date(element.date);
      element.date=d;
      if(element.type==2){
        this.myvisitors.forEach(e => {
          if(e.id == element.user_id){
            if(element.photo !=undefined && element.photo != null && element.photo !=''){
              this.postslist.push({user:e,p:element,com:[],v:true,image:true});
            }else{
              this.postslist.push({user:e,p:element,com:[],v:true,image:false});
            }
          }
        });
      }else if(element.type==3){
        this.mydoctors.forEach(e => {
          if(e.id == element.user_id){
            if(element.photo !=undefined && element.photo != null && element.photo !=''){
              this.postslist.push({user:e,p:element,com:[],v:false,image:true});
            }else{
              this.postslist.push({user:e,p:element,com:[],v:false,image:false});
            }
          }
        });
      }else if(element.type==1){
        var e:{
          first_name:string,
          last_name:string,
          photo :string
        }={
          first_name:'Admin',
          last_name:'',
          photo :'a.jpg'
        }
        this.postslist.push({user:e,p:element,com:[],v:true,image:true});
      }
    });
    console.log('=============== postslist with mapping without comments =====================');
    console.log(this.postslist);
    this.mappingtocomments();
  }
  mappingtocomments(){
    this.postslist.forEach(p => {
      var coms:comment[]=[];
      this.mycomments.forEach(c => {
        if(p.p.id == c.post_id){
          coms.push(c);
        }
      });
      this.postslist[this.postslist.indexOf(p)].com=coms;
    });
    this.postslist.reverse();
    console.log('=============== postslist with mapping and comments to showing=====================');
    console.log(this.postslist);
    this.iffoundmyposts();
  }
  status:boolean=false;
  iffoundmyposts(){
    this.postslist.forEach(element => {
      if(element.p.user_id == Number(window.localStorage.getItem('session')) && element.v == true){
        this.mypostslist.push(element)
      }
    });
    if(this.mypostslist.length > 0){
      console.log('=============== mypostslist with mapping and comments to showing=====================');
      console.log(this.mypostslist);
      this.status = true;
      this.mypostslist.reverse();
      this.loader.dismiss();
    }else{
      this.status = false;
      this.loader.dismiss();
    }
  }
  //========================== add post ==========================================
  newpost:post=new post()
  addnewpost(){
    console.log('========> in funcyion add http ')
    if(this.newpost.post1==''){
      console.log('=============> new post ')
      console.log(this.newpost.post1);
      let alert2 = this.alertCtrl.create({
        title: '!!بيانات غير مكتملة',
        subTitle: 'من فضلك ادخل نص منشورك الذى تريده اولا',
        buttons: ['!!حسنــا']
      });
      alert2.present();
    }else{
      this.newpost.user_id = Number(window.localStorage.getItem('session'));
      this.newpost.type = 2;
      var now:Date=new Date();
      this.newpost.date =now;
      //this.newpost.photo = 'a.jpg';
      console.log('=============> new post ')
      console.log(this.newpost);
      var c:Response;
      this.loader6.present();
      try {
        this.http.post(SERVER_IP +'post',this.newpost)
        .subscribe(
          (data) =>{
            c = data
            console.log('========> el response ')
            console.log(c)
            if(c.status == 201 ){
              const toast = this.toastCtrl.create({
                message: 'تم اضافة المنشور بنجاح',
                duration: 3000
                });
                toast.present();
                this.loader6.dismiss();
                this.navCtrl.setRoot('PostsPage');
          }
        });
      } catch (error) {
          console.log(error);
          this.loader6.dismiss();
          this.showAlertError();
      }
    }
  }
  //=============================== delete post ==================================
  ifdeletecom:number=0;
  deleteall(p:{user:any , p:post ,com:comment[] , image:boolean}){
    let confirm = this.alertCtrl.create({
      title: 'تأكيد حذف منشـورك',
      message:'!!فى حالة حذف المنشور لن تستطع استرجاعه مرة اخرى ',
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
            this.loader8.present();
            if(p.com.length == 0){
                console.log('=============== elcomments fadia hms7 el6ol ==================');
                this.deletepost(p.p.id);
            }else{
              p.com.forEach(element => {
                this.ifdeletecom ++;
                console.log('=============== elcomments  m4 fadia ==================');
                console.log(this.ifdeletecom);
                console.log(p.com.length);
                console.log(element);
                this.deletecomments(p.p.id, element.id, p.com.length);
              });
            }
          }
        }
      ]
    });
    confirm.present();
  }
  deletepost(id:number){
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    
    let options = new RequestOptions({ headers : headers});
    this.http.delete(SERVER_IP + 'post' +'?id=' + id ,options)
    .subscribe(
      (data) => {
        console.log(data);
        console.log('deleted post done');
        this.ifdeletecom=0;
        this.loader8.dismiss();
        this.navCtrl.setRoot('PostsPage');
    },
    (error)=>{
        console.log(error);
        this.showAlertError();
    });
  }
  deletecomments(pid:number,comid:number,len:number){
    try {
      const headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    
    let options = new RequestOptions({ headers : headers});
    this.http.delete(SERVER_IP + 'comment' +'?id=' + comid ,options)
    .subscribe(
      (data) => {
        console.log(data);
        console.log('deleted comment done');
        if(this.ifdeletecom == len)
        {
          console.log('==================== ready to delete post ==================');
          this.deletepost(pid);
        }
      });
    } catch (error) {
      console.log(error);
      this.showAlertError();
    }
    
  }

}
