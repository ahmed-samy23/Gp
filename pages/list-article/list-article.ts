import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { doctor } from '../../Models/doctor';
import { artical } from '../../Models/artical';
import { SERVER_IP } from './../../Models/connection';

/**
 * Generated class for the ListArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-article',
  templateUrl: 'list-article.html',

})
export class ListArticlePage {
    doc:doctor=new doctor();
    art:artical[]=[];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.doc=this.navParams.get('doca');
      this.art=this.navParams.get('arta');
      console.log('قول والمصحف ');
      console.log(this.doc);
      console.log(this.art);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListArticlePage');
  }
 
  gotoarticle(ar:artical){
    var mydoc:doctor=this.doc;
    this.navCtrl.push('DoctorArticlePage',{mydoc,ar})
  }
  
}
