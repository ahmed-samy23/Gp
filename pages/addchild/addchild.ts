import { child_vaccinations } from './../../Models/child_vaccinations';
import { Vaccination } from './../../Models/Vaccination';
import { SERVER_IP } from './../../Models/connection';
import { Http, Response } from '@angular/http';
import { child } from './../../Models/child';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime, ToastController, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddchildPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addchild',
  templateUrl: 'addchild.html',
})
export class AddchildPage {
  newchild:child = new child();
  now:Date=new Date();
  b:DateTime;
  datett:string[];
  children :child[]=[];
  vaciinationlist :Vaccination[]=[];
  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams ,public http:Http,public toastCtrl: ToastController
                , private alertCtrl :AlertController,private loadingCtrl: LoadingController) {
                  this.loader.present();
                  this.getchildren();
                  console.log('=============> time nw');
                  console.log(this.now);
    //this.getviccs();
  }
//============================= alerts functions ================================================
  public event = {
    month: '2018-01-01'
  }
  showAlert(titlestring:string , subtitlestring:string) {
    let alert = this.alertCtrl.create({
      title: titlestring,
      subTitle: subtitlestring,
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
  showConfirm(name:string) {
    let confirm = this.alertCtrl.create({
      title: 'تأكيد بيانات الطفل',
      message: 'لقد طلبت اضافه ' +'\n'+ name +' كطفل جديد لك ' + '\n'+ ' بتاريخ ميلاد ' +'\n'+ this.event.month,
      buttons: [
        {
          text: '!!الغاء, تعديل',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '!!موافق , اضـف',
          handler: () => {
            this.initializechild(name);
          }
        }
      ]
    });
    confirm.present();
  }
  showAlertError() {
    let alert = this.alertCtrl.create({
      title: '!!فشل التعامل مع السيرفر',
      subTitle: '!!قد نواجه مشكله ما مع السيرفر...نرجو المحاوله فيما بعد مع ملاحظه ان طلبك لم يتم تنفيذه',
      buttons: ['!!حسنــا']
    });
    alert.present();
  }
 //============================= get data ================================================
  getchildren(){
    try {
      this.http.get(SERVER_IP + 'child')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      (data) =>  {
        for(var key in data){
        var temp:child = data[key];
        this.children.push(temp);
      }
      console.log('======= children list ===========')
      console.log(this.children)
      this.getviccs();
      }
    );
    } catch (error) {
      console.log(error);
      this.showAlertError();
    }
  }
  getviccs(){
    try {
      this.http.get(SERVER_IP + 'vaccination')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      (data) => {
        for(var key in data){
        var temp:Vaccination = data[key];
        this.vaciinationlist.push(temp);}
        console.log('======= vaccs list ===========')
        console.log(this.vaciinationlist)
        this.loader.dismiss();
      }
    );
    } catch (error) {
      console.log(error);
      this.showAlertError();
    }
  }
  //============================== add child functions =============================================
  chickifchildexist(newchil:child){
    var statu:boolean =false;
      this.children.forEach(element => {
        if(newchil.name == element.name && newchil.visitor_id == element.visitor_id){
          statu= true;
          return statu;
        }
      });
      return statu;
  }
   
  addnewchild(n : child){
    console.log('========> in funcyion add http ')
    var c:Response;
    var cn:child;
    try {
      this.http.post(SERVER_IP +'child',n)
    .subscribe(
      (data) =>{
        c = data
        console.log('========> el response ')
        console.log(c)
        cn = data.json();
        console.log('========> el data ')
        console.log(cn)
        this.childvaccinationscalc(cn);
      } 
    );
    } catch (error) {
      console.log(error);
      this.showAlertError();
    }
  }

  childvaccinationscalc(c:child){
    console.log('======= in function calculate =========');
    console.log(c);
    var ch_vac :child_vaccinations=new child_vaccinations();
    console.log('======= vaciinationlist =========');
    console.log(this.vaciinationlist);
    //calculate date of vaccinations
    this.vaciinationlist.forEach(element => {
      console.log('======= vaciinationlist =========');
      console.log(this.vaciinationlist);
      var addyears:number=0;
      var b:Date=new Date(c.Birthday);
      console.log('===========> b')
      console.log(b)
      console.log('===========> typeof(b)')
      console.log(typeof(b))
      var year:number=b.getFullYear();
      var mounth:number=b.getMonth();
      var day:number=b.getDate();
      console.log('======= w2t elt63eeeeem =========');
      console.log(element.time);
      addyears=(element.time / 12);
      console.log('======= befor spliter =========');
      console.log(addyears);
      var s:string =addyears.toString();
      if(!s.includes('.')){
        s =s+'.0';
      }
      var values =s.split('.');
      console.log('======= years,mounth spliter =========');
      console.log(values[0]);
      console.log(Number('0.'+values[1]));
      console.log(Number('0.'+values[1])*12);
      console.log('======= fr2 elsnen welshohor ll63em =========');
      console.log(addyears);
      year+=Number(values[0]);
      mounth+=Number('0.'+values[1])*12;
      if(mounth == 12){
          mounth = 11;
      }
      
      if(mounth > 12){
        year++;
        mounth = mounth - 12;
        if(mounth == 12){
          mounth = 11;
        }
      }
      
      console.log('======= b3d 7sab ,elnateg elnha2y =========');
      console.log(year);
      console.log(mounth);
      console.log('================================');
      //chick m3ad elt63em lw fat m4 bdifh lw lsa bdifh
      var timestring:string = year.toString() + '-' + (mounth+1).toString() +'-'+(day-1).toString();
      console.log('======= time string =========');
      console.log(timestring);
      var timevacc:Date=new Date(timestring);
      console.log('=======Date time string =========');
      console.log(timevacc);
      if(timevacc < this.now){
        console.log('=================> m3adh fat');
      }else{
        //console.log('_year'+year +' _mounth' +mounth + ' _day' +day);
        var timeofvaciination=new Date(year , mounth , day);
        ch_vac.child_id = c.id;
        ch_vac.vacc_id =element.id;
        ch_vac.time = timeofvaciination;
        console.log('=======m3ana wda el obj =========');
        console.log(ch_vac)
        
        try {
          this.http.post(SERVER_IP +'child_vaccinations',ch_vac)
        .subscribe(
          (data) =>{
            var c:Response =data;
            console.log('========> el response ')
            console.log(c);
          } 
        );
    
        } catch (error) {
          console.log(error);
          this.showAlertError();
        }
      }
    });
    //toast bar for user
    const toast = this.toastCtrl.create({
      message: 'تم اضافة طفلك بنجاح..يمكنك مشاهده مواعيد تطعيماته بعد عمل الاربع اختبارات الاجبارية القادمة',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
    this.navCtrl.setRoot('AutismTestPage',c);
  }

  initializechild(name:string){
    this.datett=this.event.month.split('-');
    console.log('name = '+ name);
    console.log('birtday ========= ');
    console.log('day = '+ this.datett[2]);
    console.log('mounth = '+this.datett[1]);
    console.log('year = '+ this.datett[0]);
    //calculate date
    console.log('now years ========= ');
    console.log(this.now.getFullYear());
    console.log('now mounth ========= ');
    console.log(this.now.getMonth()+1);
    console.log('now day ========= ');
    console.log(this.now.getUTCDay());
    console.log('now date ========= ');
    console.log(this.now.getDate());

    var yearcon=Number(this.datett[0]);
    console.log('yearcon = '+yearcon);

    var yeardiff=this.now.getFullYear() - yearcon;
    console.log('yeardiff = '+yeardiff);
    console.log('new ====== ');
    console.log(this.newchild);

    if(yeardiff > 6){
      var title1:string='!!لم يتم أضافة طفلك';
      var subtitle1:string='طفلك اكبر من 6 سنوات...وهكذا يعنى اننا لا نستطيع تقديم مايفيده...نحن نهدف الاطفال حديثى الولاده حتى سن 6 سنوات فقط';
      this.showAlert(title1,subtitle1);
    }
    else if(yeardiff == 6){
      if((this.now.getMonth()+1) >= Number(this.datett[1])){
        var title2:string='!!لم يتم أضافة طفلك';
        var subtitle2:string='طفلك اكبر من 6 سنوات...وهكذا يعنى اننا لا نستطيع تقديم مايفيده...نحن نهدف الاطفال حديثى الولاده حتى سن 6 سنوات فقط';
        this.showAlert(title2,subtitle2);
      }
      else if((this.now.getMonth()+1) < Number(this.datett[1])){
        this.newchild.visitor_id = Number(window.localStorage.getItem('session'))
        //this.newchild.visitor_id = 1 //elssesion
        this.newchild.age=yeardiff;
        this.newchild.name=name;
        var year=parseInt(this.datett[0]);
        var mounth=parseInt(this.datett[1]);
        var day=parseInt(this.datett[2]);
        //console.log('_year'+year +' _mounth' +mounth + ' _day' +day);
        var birthday=new Date(year , mounth-1 , day+1);
        console.log('=============> birthday')
        console.log(birthday);
        //console.log(birthday);
        this.newchild.Birthday = birthday;
        //if the child exist befor
        console.log('============= > this.newchild');
        console.log(this.newchild);
        var exist = this.chickifchildexist(this.newchild);
        if(exist){
          var title3:string='!!لم يتم أضافة طفلك';
          var subtitle3:string='لقد قمـت باضافه هذا الطفل من قبل معنا';
          this.showAlert(title3,subtitle3);
        }else{
          this.addnewchild(this.newchild);
          console.log('========> obj after added to send vac');
          //console.log(result2);
          //calculate vaccinations
        }
      }
    }else if(yeardiff < 6){
      this.newchild.visitor_id = Number(window.localStorage.getItem('session'));
        this.newchild.age=yeardiff;
        this.newchild.name=name;
        var year2=parseInt(this.datett[0]);
        var mounth2=parseInt(this.datett[1]);
        var day2=parseInt(this.datett[2]);
        //console.log('_year'+year +' _mounth' +mounth + ' _day' +day);
        var birthday2=new Date(year2 , mounth2-1 , day2+1);
        console.log('=============> birthday')
        console.log(birthday2);
        this.newchild.Birthday = birthday2;
        console.log('============= > this.newchild');
        console.log(this.newchild);
        //if the child exist befor
        var exist2 = this.chickifchildexist(this.newchild);
        if(exist2){ 
        var title4:string='!!لم يتم أضافة طفلك';
        var subtitle4:string='لقد قمـت باضافه هذا الطفل من قبل معنا';
        this.showAlert(title4,subtitle4);
        }else{
          this.addnewchild(this.newchild);
          console.log('========> obj after added to send vac');
          //console.log(result2);
          //calculate vaccinations
          //this.navCtrl.setRoot('ChildernPage');
        }
    }

  }
  validationdata(name:string){
    if(name ==''){
      var title:string='!!بيانات غير مكتملة';
      var subtitle:string='قد تركت اسم الطفل او التاريخ بدون بيانات...من فضلك أعد دخول البيانات كاملة جميعهم متطلبات أساسية لاضافة طفل جديد';
      this.showAlert(title,subtitle);
    }else{
      this.showConfirm(name);
  }
  }


      /*if(element.time >= 12){
        var year:number=c.Birthday.getFullYear();
        var mounth:number=c.Birthday.getMonth();
        var day:number=c.Birthday.getDay();
        while(element.time >= 12){
          year++;
          element.time -=12;
          var reminder = element.time;
        }
        mounth = mounth + reminder;
        
        console.log('_year'+year +' _mounth' +mounth + ' _day' +day);
        var timeofvaciination=new Date(year , mounth-1 , day);
    
        //chick m3ad elt63em lw fat m4 bdifh lw lsa bdifh
        if(year==this.now.getFullYear() && mounth == this.now.getMonth() +1 && day == this.now.getDay() +1){
          console.log('m3adh fat');
        }else if(year < this.now.getFullYear() && mounth < this.now.getMonth() +1 && day < this.now.getDay() +1){
          console.log('m3adh fat');
        }else{
          ch_vac.child_id = c.id;
          ch_vac.vacc_id =c.vistor_id;
          ch_vac.time = timeofvaciination;
          this.http.post('',ch_vac);
        }
      }else{
        var year2:number=c.Birthday.getFullYear();
        var mounth2:number=c.Birthday.getMonth();
        var day2:number=c.Birthday.getDay();
        var newmounth :number = mounth2 + element.time;
        if(newmounth>12){
          year2++;
          mounth2 = newmounth-12;
        }
        var timeofvaciination2=new Date(year2 , mounth2 , day2);
        ch_vac.child_id = c.id;
        ch_vac.vacc_id =c.vistor_id;
        ch_vac.time = timeofvaciination2;
        this.http.post('',ch_vac);
      }*/
}