import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {RoutingComponent} from './routing/routing.component';

const routes: Routes = [
  { path: '**', component: RoutingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
