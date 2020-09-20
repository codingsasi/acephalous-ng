import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {RoutingComponent} from './routing/routing.component';
import {ArticlesListComponent} from './core/content/articles-list/articles-list.component';

const routes: Routes = [
  { path: 'node', component: ArticlesListComponent },
  { path: '**', component: RoutingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
