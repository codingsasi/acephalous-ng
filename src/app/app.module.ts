import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared.module';
import { NodeListComponent } from './core/content/node-list/node-list.component';
import {FrontPageComponent} from './core/content/front-page/front-page.component';
import { RoutingComponent } from './routing/routing.component';
import { ArticleComponent } from './core/content/article/article.component';


@NgModule({
  declarations: [
    AppComponent,
    NodeListComponent,
    ArticleComponent,
    FrontPageComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
