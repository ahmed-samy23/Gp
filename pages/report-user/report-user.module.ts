import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportUserPage } from './report-user';

@NgModule({
  declarations: [
    ReportUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportUserPage),
  ],
})
export class ReportUserPageModule {}
