import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { HeaderComponent } from './header/header.component';
import { LoginModule } from '../login/login.module';



@NgModule({
  declarations: [
    DisplayComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DisplayComponent,
    HeaderComponent
  ]
})
export class MiscModule { }
