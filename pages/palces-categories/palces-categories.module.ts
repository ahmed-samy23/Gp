import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalcesCategoriesPage } from './palces-categories';

@NgModule({
  declarations: [
    PalcesCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(PalcesCategoriesPage),
  ],
})
export class PalcesCategoriesPageModule {}
