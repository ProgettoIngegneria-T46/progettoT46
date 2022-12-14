import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { MiscModule } from '../misc/misc.module';
import { AbbonamentiComponent } from './abbonamenti/abbonamenti.component';
import { CorsiComponent } from './corsi/corsi.component';



@NgModule({
  declarations: [
    ContactsComponent,
    HomeComponent,
    ShopComponent,
    AbbonamentiComponent,
    CorsiComponent,
  ],
  imports: [
    CommonModule,
    MiscModule,
    HttpClientModule
  ],
  exports: [
    ContactsComponent,
    HomeComponent,
    ShopComponent
  ]
})
export class PagesModule { }
