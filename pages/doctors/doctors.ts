import { doctor } from './../../Models/doctor';
import { SERVER_IP } from './../../Models/connection';
import { visitor } from './../../Models/visitor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { Http ,Response} from '@angular/http';
import 'rxjs/Rx';

/**
 * Generated class for the DoctorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctors',
  templateUrl: 'doctors.html',
})
export class DoctorsPage {

  loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 10000
  });
  constructor(public navCtrl: NavController, public navParams: NavParams ,private menuCtrl:MenuController
                ,private modalCtrl:ModalController , public http: Http,private loadingCtrl: LoadingController
              ,private alertCtrl:AlertController) {
    menuCtrl.enable(true);
    this.loader.present();
    this.returndataofdoctors();
    this.initializeItems();
    this.pet='all';
  }

  pet:string;
  menubutton(){
    this.menuCtrl.open();
  }
  reportpage(person:any,type:number){
    if((person.id == Number(window.localStorage.getItem('session')) && type == 2)){
      console.log('=====================> can not send report to your self')
      let alert = this.alertCtrl.create({
        title: '!!غير مسموح',
        subTitle: 'نأسف لا تستطيع ان تبلغ عن نفسك',
        buttons: ['!!حسنــا']
      });
      alert.present();
    }else{
    this.navCtrl.push('ReportUserPage',{person , type});
    }
  }
  presentModal(person:any,type:number) {
    console.log('=========== in func to modal ======')
    console.log(person)
    console.log(type)
    console.log('=========== ===================== ======')
    let modal = this.modalCtrl.create('ProfileUserModalPage',{person , type});
    modal.present();
  }
  openmassages(person:any , type :number){
    if((person.id == Number(window.localStorage.getItem('session')) && type == 2)){
      console.log('=====================> can not send massage to your self')
      let alert = this.alertCtrl.create({
        title: '!!غير مسموح',
        subTitle: 'نأسف لا تستطيع ان تراسل نفسك',
        buttons: ['!!حسنــا']
      });
      alert.present();
    }else{
    this.navCtrl.push('MassegePage',{person,type});
  }
  }
  //============================getting data===============================//
  visitorslist: visitor[]=[]; //list of doctors from data base
  doctorlist: doctor[]=[];
  returndataofvisitors(){
    this.http.get(SERVER_IP + 'visitors')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:visitor = data[key];
        if(temp.block != true){
        this.visitorslist.push(temp);
      }
      }
      this.loader.dismiss();
      console.log('visitor list');
      console.log(this.visitorslist);
      console.log('======================================');
    }
    );
  }
  returndataofdoctors(){
    this.http.get(SERVER_IP + 'doctor')
    .map((response :Response) =>{
      return response.json()
    }).subscribe(
      //(data) => this.visitorslist.push(data)
      (data) => {
        for(var key in data){
        var temp:doctor = data[key];
        if(temp.Type==1){
          this.doctorlist.push(temp) 
        }
      }
      console.log('doctor list');
        console.log(this.doctorlist);
        console.log('======================================');
      this.returndataofvisitors();
    }
    );
  }
 //============================search bar events===============================//
  searchvisitor_list : visitor[];
  searchdoc_list : doctor[];
  searchall_list:any[]=[];
  D_list:doctor[]=[];
  V_list:visitor[]=[];
  //all_list:Array<{type:string ,obj:any}>=[];
  //searchall_list:Array<{type:string ,obj:any}>=[];
  initializeItems() {
    this.D_list=this.doctorlist
    this.V_list=this.visitorslist
    console.log('==========> this.V_list')
    console.log(this.V_list);
    this.searchdoc_list = this.doctorlist;
    this.searchvisitor_list = this.visitorslist;
  }

  getItemsofvisitors(ev: any) {
    var searchlist:visitor[]=[]
    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log(val);
    // if the value is not an empty string filter the items
    if (val && val.trim() != '') {
       this.visitorslist.filter((item) => {
        if(item.first_name.includes(val) || item.last_name.includes(val)){
          searchlist.push(item);
        }
      })
      
      this.searchvisitor_list = searchlist
    }
    else{
      // if the value is an empty string don't filter the items
      this.searchvisitor_list = this.visitorslist;
    }
  //console.log(this.searchvisitor_list);
  }
  getItemsofdoc(ev: any) {
    var searchlist:doctor[]=[]
    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log(val);
    // if the value is not an empty string filter the items
    if (val && val.trim() != '') {
       this.doctorlist.filter((item) => {
        if(item.first_name.includes(val) || item.last_name.includes(val)){
          searchlist.push(item);
        }
      })
      
      this.searchdoc_list = searchlist
    }
    else{
      // if the value is an empty string don't filter the items
      this.searchdoc_list = this.doctorlist;
    }
  //console.log(this.searchvisitor_list);
  }
  getItemsofall(ev: any) {
    //var searchlist:Array<{type:string ,obj:any}>=[]
    var searchlistd:any[]=[]
    var searchlistv:any[]=[]
    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log(val);
    // if the value is not an empty string filter the items
    if (val && val.trim() != '') {
      this.visitorslist.filter((item) => {
       if(item.first_name.includes(val) || item.last_name.includes(val)){
         searchlistv.push(item);
       }
     })
     this.doctorlist.filter((item) => {
      if(item.first_name.includes(val) || item.last_name.includes(val)){
        searchlistd.push(item);
      }
    })
      this.V_list = searchlistv;
      this.D_list = searchlistd;
   }
   else{
     // if the value is an empty string don't filter the items
     this.initializeItems();
   }
  }

}
