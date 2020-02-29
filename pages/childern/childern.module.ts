import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildernPage } from './childern';

@NgModule({
  declarations: [
    ChildernPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildernPage),
  ],
})
export class ChildernPageModule {}
