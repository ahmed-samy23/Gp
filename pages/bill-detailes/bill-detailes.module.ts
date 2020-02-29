import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillDetailesPage } from './bill-detailes';

@NgModule({
  declarations: [
    BillDetailesPage,
  ],
  imports: [
    IonicPageModule.forChild(BillDetailesPage),
  ],
})
export class BillDetailesPageModule {}
