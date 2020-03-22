import { NgModule } from '@angular/core';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from '../shared.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    NavigationModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    NavigationModule
  ]
})
export class CoreModule { }
