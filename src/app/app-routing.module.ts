import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesGridComponent } from './core/content/articles-grid/articles-grid.component';
import { ArticlesListComponent } from './core/content/articles-list/articles-list.component';

const routes: Routes = [
  { path: 'articles/grid', component: ArticlesGridComponent},
  { path: 'articles/list', component: ArticlesListComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
