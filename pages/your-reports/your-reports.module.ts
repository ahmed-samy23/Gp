import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourReportsPage } from './your-reports';

@NgModule({
  declarations: [
    YourReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(YourReportsPage),
  ],
})
export class YourReportsPageModule {}
