import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesGridComponent } from './core/content/articles-grid/articles-grid.component';
import { ArticlesListComponent } from './core/content/articles-list/articles-list.component';
import { HomePageComponent } from './core/content/home-page/home-page.component';

const routes: Routes = [
  { path: 'articles/grid', component: ArticlesGridComponent},
  { path: 'articles/list', component: ArticlesListComponent},
  { path: '**', redirectTo: '/' },
  { path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
