import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import {SharedModule} from "../../shared.module";



@NgModule({
  declarations: [UserComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class UserModule { }
