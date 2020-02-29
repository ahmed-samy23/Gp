import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunicationTestPage } from './communication-test';

@NgModule({
  declarations: [
    CommunicationTestPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationTestPage),
  ],
})
export class CommunicationTestPageModule {}
