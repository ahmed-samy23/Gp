import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MassegePage } from './massege';

@NgModule({
  declarations: [
    MassegePage,
  ],
  imports: [
    IonicPageModule.forChild(MassegePage),
  ],
})
export class MassegePageModule {}
