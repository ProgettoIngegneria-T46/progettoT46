import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { MiscModule } from '../misc/misc.module';
import { AbbonamentiComponent } from './abbonamenti/abbonamenti.component';
import { CorsiComponent } from './corsi/corsi.component';
import { LoginModule } from '../login/login.module';
import { AdminHeaderComponent } from './shop/admin/admin-header/admin-header.component';
import { FormNuovoCorsoComponent } from './shop/admin/form-nuovo-corso/form-nuovo-corso.component';



@NgModule({
  declarations: [
    ContactsComponent,
    HomeComponent,
    ShopComponent,
    AbbonamentiComponent,
    CorsiComponent,
    AdminHeaderComponent,
    FormNuovoCorsoComponent,
  ],
  imports: [
    CommonModule,
    MiscModule,
    HttpClientModule,
    LoginModule,
  ],
  exports: [
    ContactsComponent,
    HomeComponent,
    ShopComponent
  ]
})
export class PagesModule { }
