import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileUserModalPage } from './profile-user-modal';

@NgModule({
  declarations: [
    ProfileUserModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileUserModalPage),
  ],
})
export class ProfileUserModalPageModule {}
