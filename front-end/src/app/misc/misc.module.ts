import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { HeaderComponent } from './header/header.component';
import { LoginModule } from '../login/login.module';
import { PipesModule } from '../pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    DisplayComponent,
    HeaderComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    AppRoutingModule,
    LoginModule
  ],
  exports: [
    DisplayComponent,
    HeaderComponent
  ]
})
export class MiscModule { }
