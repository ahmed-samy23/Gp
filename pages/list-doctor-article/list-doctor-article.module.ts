import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListDoctorArticlePage } from './list-doctor-article';

@NgModule({
  declarations: [
    ListDoctorArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(ListDoctorArticlePage),
  ],
})
export class ListDoctorArticlePageModule {}
