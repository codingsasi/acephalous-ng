import {NgModule} from '@angular/core';
import {NavigationModule} from './navigation/navigation.module';
import {SharedModule} from '../shared.module';
import {HttpClientModule} from '@angular/common/http';
import {ContentModule} from './content/content.module';
import {UserModule} from './user/user.module';
import {TaxonomyModule} from './taxonomy/taxonomy.module';

@NgModule({
  declarations: [],
  imports: [
    NavigationModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    NavigationModule,
    ContentModule,
    TaxonomyModule,
    UserModule
  ]
})
export class CoreModule {
}
