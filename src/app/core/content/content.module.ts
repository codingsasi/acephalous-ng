import { NgModule } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { PageComponent } from './page/page.component';
import { SharedModule } from 'src/app/shared.module';

// TODO Manage declarations appearnign in  multiple places.
@NgModule({
  declarations: [ArticleComponent, PageComponent],
  imports: [
    SharedModule
  ]
})
export class ContentModule { }
