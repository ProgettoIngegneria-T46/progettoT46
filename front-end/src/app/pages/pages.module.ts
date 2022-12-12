import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';



@NgModule({
  declarations: [
    ContactsComponent,
    HomeComponent,
    ShopComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContactsComponent,
    HomeComponent,
    ShopComponent
  ]
})
export class PagesModule { }
