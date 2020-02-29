import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorArticlePage } from './doctor-article';

@NgModule({
  declarations: [
    DoctorArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorArticlePage),
  ],
})
export class DoctorArticlePageModule {}
