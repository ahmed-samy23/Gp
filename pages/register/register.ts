import { SERVER_IP } from './../../Models/connection';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { visitor } from './../../Models/visitor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Login } from '../../Models/Login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  visitorslist:Array<any>;
  //visitorslist: visitor[] =[]
  constructor(public navCtrl: NavController, public navParams: NavParams ,private alertCtrl:AlertController,private http:Http
              ,public toastCtrl: ToastController) {
                //this.getdata();
  }

  goToLogin(){
    this.navCtrl.setRoot('LoginPage');
  } 


  getdata(){
    //loading
    this.http.get(SERVER_IP + 'visitors')
    .map((response :Response) => response.json())
    .subscribe(
      (data) => {
        console.log("inside subscribe");
        this.visitorslist= this.snapToArray(data);

    });
  }

  snapToArray(snapData)
  {
    let returnarray=[]
    snapData.forEach(snapchild => {
     // console.log(snapchild);
       let item =snapchild;
       returnarray.push(item);
    });
    return returnarray;
  }
  snapToObject(snapData)
  {
    let returnarray=[]
    snapData.forEach(snapchild => {
     // console.log(snapchild);
       let item =snapchild;
       returnarray.push(item);
    });
    return returnarray[0];
  }
  showlist(){
    const headers = new Headers();
     headers.append('Access-Control-Allow-Origin' , '*');
     headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    
    let options = new RequestOptions({ headers : headers});
    this.http.delete(SERVER_IP + 'visitors'+'?id=6',options)
    .map((response :Response) => response.json())
    .subscribe(
      (data) => {
        console.log(data);

    },
    (error)=>{
        console.log(error);
    });
  }
  showAlert(titlestring:string , subtitlestring:string) {
    let alert = this.alertCtrl.create({
      title: titlestring,
      subTitle: subtitlestring,
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  
  ifexist(username,email){
    console.log('in if exist=========')
    console.log(username)
    console.log(email)
    var statu:boolean =false;

    this.http.get(SERVER_IP + 'visitors')
    .map((response :Response) => response.json())
    .subscribe(
      (data) => {
        console.log("inside subscribe");
        this.visitorslist= this.snapToArray(data);
        
        this.visitorslist.forEach(element => {
        if(element.user_name == username || element.email == email){
          //window.localStorage.setItem('session',element.id.toString());
          console.log('=====user name element ==============')
          console.log(element.user_name)
          console.log('=====email element ==============')
          console.log(element.email)
          statu=true;
          return statu;
        }
      });
      return statu;
    });

    
  }
  
  addnewvisitor(first_name:string, last_name:string,username:string, email:string, phone:string ,password:string ,repass:string){
    console.log('in func-----------------');
    console.log(first_name);
    if(first_name== '' || last_name=='' || email=='' || username=='' || phone=='' || password=='' ||repass ==''){
      var title:string='!!بيانات غير مكتملة';
      var subtitle:string='من فضلك أعد دخول البيانات كاملة جميعهم متطلبات أساسية لتسجيل';
      this.showAlert(title,subtitle);
    }
    else if(password == repass)
    {
      var exist:boolean = false;
      

      this.http.get(SERVER_IP + 'visitors')
      .map((response :Response) => response.json())
      .subscribe(
      (data) => {
        console.log("inside subscribe");
        this.visitorslist= this.snapToArray(data);
        
        this.visitorslist.forEach(element => {
          if(element.user_name == username || element.email == email){
            //window.localStorage.setItem('session',element.id.toString());
            console.log('=====user name element ==============')
            console.log(element.user_name)
            console.log('=====email element ==============')
            console.log(element.email)
            exist=true;
          }
        });
        if(exist)
        {
          var title1:string='!!مستخدم موجود بالفعل';
          var subtitle1:string=' اسم المستخدم او البريد الالكترونى موجود مسبقا بالعفل..الرجاء تغير البريد الالكترونى اذا سبق لك التسجيل بيه..او تغيير اسم المستخدم حتى لا يتشابه مع مستخدم اخر';
          this.showAlert(title1,subtitle1);
        }
        else
        {
          var newvisitor:visitor =new visitor();
          newvisitor.first_name =first_name;
          newvisitor.last_name =last_name;
          newvisitor.email = email;
          newvisitor.phone =phone;
          newvisitor.password=password;
          newvisitor.block=false;
          newvisitor.photo = '/Images/defult.jpg';
          newvisitor.user_name = username;

          console.log('new obj =')
          console.log(newvisitor)
          console.log('repassword = ')
          console.log(repass)
          try {
            const headers = new Headers();
            //  headers.append('Access-Control-Allow-Origin' , '*');
            //  headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            // headers.append('Accept','application/json');
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
            let options = new RequestOptions({ headers : headers});
            this.http.post(SERVER_IP +'visitors',newvisitor ,options)
            .subscribe(
              (data) => {
                console.log(data);
                if(data.status==201)
                {
                  var vi:visitor =new visitor();
                  vi= data.json();
                  console.log('============= visitor to log in =============')
                  console.log(vi);
                  this.logweb(vi);
                }
              });
              

          } catch (error) {
            console.log(error);
          }
          
          //اتاكد من الريتيرن بتاع الويب اه بى اى انه اتضاف الاول
          
          }

      });
    }
    else
    {
      //elbasen m4 sa7
      var title2:string='!!خطأ بكلمة السر';
      var subtitle2:string='كلمتى السر غير متطابقين..برجاء اعادة كتابتهم من جديد';
      this.showAlert(title2,subtitle2);
    }
    
  }
  logweb(v:visitor){
    var newvisitor2:Login =new Login();
    newvisitor2.IDUser =v.id;
    newvisitor2.Password = v.password;
    newvisitor2.Type = 2;
    newvisitor2.Username = v.user_name;
    console.log('========== log obj ===============');
    console.log(newvisitor2);
    try {
      const headers = new Headers();
      //  headers.append('Access-Control-Allow-Origin' , '*');
      //  headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      // headers.append('Accept','application/json');
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      let options = new RequestOptions({ headers : headers});
      this.http.post(SERVER_IP +'Login',newvisitor2 ,options)
      .subscribe(
        (data) => {
          console.log(data);
          if(data.status==201)
          {
            let toast = this.toastCtrl.create({
              message: 'تم التسجيل معنا بنجاح...يمكنك تسجيل الدخول الان',
              duration: 3000
            });
            toast.present();
            this.navCtrl.setRoot('LoginPage');
          }
        });
        

    } catch (error) {
      console.log(error);
    }
  }

}
