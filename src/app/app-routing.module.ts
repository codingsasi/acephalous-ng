import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {RoutingComponent} from './routing/routing.component';
import {NodeListComponent} from './core/content/node-list/node-list.component';

const routes: Routes = [
  { path: 'node', component: NodeListComponent },
  { path: '**', component: RoutingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
