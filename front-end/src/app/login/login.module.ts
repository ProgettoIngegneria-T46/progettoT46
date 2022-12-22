import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgxBootstrapIconsModule, pencilFill } from 'ngx-bootstrap-icons';

const icons = {
  pencilFill
};

@NgModule({
  declarations: [
  
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(icons)
  ],
  exports: [
    LoginFormComponent
  ]
})
export class LoginModule { }
