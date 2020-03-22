import { NgModule } from '@angular/core';
import { PrimaryMenuComponent } from './primary-menu/primary-menu.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [PrimaryMenuComponent, MenuComponent],
  imports: [
    SharedModule,
  ],
  exports: [
    PrimaryMenuComponent, MenuComponent,
  ]
})
export class NavigationModule { }
