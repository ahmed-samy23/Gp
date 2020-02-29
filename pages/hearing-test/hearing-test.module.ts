import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HearingTestPage } from './hearing-test';

@NgModule({
  declarations: [
    HearingTestPage,
  ],
  imports: [
    IonicPageModule.forChild(HearingTestPage),
  ],
})
export class HearingTestPageModule {}
