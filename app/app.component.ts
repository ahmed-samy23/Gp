import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: Nav;
  //menu: MenuController;
  //rootPage:any = 'AutismTestPage';
  rootPage:any = 'LoginPage';
  activepage:any = 'PostsPage';
  pages:Array<{icon:string ,color:string ,title:string , pagename:string}>
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menu: MenuController) {
    
    this.pages=[
      {icon:"md-happy" ,color:"icon1", title:'الصفحة الشخصية' , pagename: 'MyprofilePage'},
      {icon:"md-home" ,color:"navbar", title:'الصفحة الرئيسية' , pagename: 'PostsPage'},
      {icon:"ios-brush" ,color:"icon4", title:'مقالات الدكاترة الخاصة بنا' , pagename: 'ListDoctorArticlePage'},
      {icon:"md-document" ,color:"light", title:'مقالات ونصايـح عامــة' , pagename: 'ArticaladvicecategoryPage'},
      {icon:"ios-chatbubbles" ,color:"icon5", title:'المحادثـات' , pagename: 'ChatListPage'},
      {icon:"md-notifications" ,color:"icon3", title:'الاشعــارات' , pagename: 'NotificationPage'},
      {icon:"ios-bowtie" ,color:"danger", title:'التطعيمــات' , pagename: 'VaccinationPage'},
      {icon:"ios-people" ,color:"dark", title:'أطفـــالى' , pagename: 'ChildernPage'},
      {icon:"ios-bulb" ,color:"orange", title:'الاختبارت' , pagename: 'TestsPage'},
      {icon:"md-bus" ,color:"dark", title:'الاماكــن' , pagename: 'PalcesCategoriesPage'},
      {icon:"ios-musical-notes" ,color:"icon3", title:'القصـص' , pagename: 'StoriesPage'},
      {icon:"ios-basket" ,color:"danger", title:'المنتجــات' , pagename: 'ProductsPage'},
      {icon:"logo-bitcoin" ,color:"cadetblue", title:'فواتير سابقة' , pagename: 'BillsPage'},
      {icon:"ios-people" ,color:"icon4", title:'المستخدمون' , pagename: 'DoctorsPage'},
      {icon:"md-close-circle" ,color:"primary", title:'الابلاغــات' , pagename: 'ReportsPage'},
      {icon:"ios-bowtie" ,color:"light", title:'ارسال ملاحظـات وشكاوى' , pagename: 'FeedbackPage'}
    ]
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(Page){
    this.nav.setRoot(Page.pagename);
    this.menu.toggle();
    this.activepage=Page;
  }
  chickactivepage(Page){
    return Page == this.activepage;
  }
  logout(){
    window.localStorage.clear();
    this.nav.setRoot('LoginPage');
    this.menu.toggle();
  }
}
