import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListArticlePage } from './list-article';

@NgModule({
  declarations: [
    ListArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(ListArticlePage),
  ],
})
export class ListArticlePageModule {}
