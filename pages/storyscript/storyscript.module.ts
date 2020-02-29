import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryscriptPage } from './storyscript';

@NgModule({
  declarations: [
    StoryscriptPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryscriptPage),
  ],
})
export class StoryscriptPageModule {}
