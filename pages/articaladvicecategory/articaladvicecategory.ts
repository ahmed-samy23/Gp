import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ArticaladvicecategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articaladvicecategory',
  templateUrl: 'articaladvicecategory.html',
})
export class ArticaladvicecategoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private menuCtrl:MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticaladvicecategoryPage');
  }
  gotoarticle(name:string,title:string)
  {
    this.navCtrl.push('ArticaladvicePage',{name,title})
  }
  menubutton(){
    this.menuCtrl.open();
  }

}
