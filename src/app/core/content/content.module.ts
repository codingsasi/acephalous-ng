import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import {ArticleComponent} from './article/article.component';
import {NodeListComponent} from './node-list/node-list.component';

// TODO Manage declarations appearing in  multiple places.
@NgModule({
  declarations: [
    ArticleComponent,
    NodeListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ArticleComponent,
    NodeListComponent
  ]
})
export class ContentModule { }
