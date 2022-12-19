import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  email: string = '';
  password: string = '';

  constructor(public loginService: LoginService) { }

  login(email: string, password: string) {
    this.loginService.login(email, password);
  }

}
