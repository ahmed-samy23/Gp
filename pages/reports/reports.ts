import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController) {
    this.menuCtrl.enable(true);
  }

  ReportsAboutYou(){
    this.navCtrl.push('ReportsAboutYouPage');
  }
  yourReports(){
    this.navCtrl.push('YourReportsPage');
  }
  menubutton(){
    this.menuCtrl.open();
  }
}
