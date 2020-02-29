import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyVaccinationPage } from './my-vaccination';

@NgModule({
  declarations: [
    MyVaccinationPage,
  ],
  imports: [
    IonicPageModule.forChild(MyVaccinationPage),
  ],
})
export class MyVaccinationPageModule {}
