import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  email: string = '';
  password: string = '';

  constructor(public loginService: LoginService) { 
    loginService.loginStateChange.subscribe((token) => {
      console.log("token: " + token)
      if(token){
        this.clearFields();
        this.loginStateChange.emit(token);
      }else{
        if(!this.logged){
          this.clearFields();
        }else{
          this.clearPassword();
        }
      }
    })
  }

  registration = false;
  logged = false;

  @Output() loginStateChange = new EventEmitter<string | undefined>();

  login(email: string, password: string) {
    this.loginService.login(email, password);
    this.logged = true;
  }

  clearFields(){
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((input) => {
      (input as HTMLInputElement).value = "";
    });
  }

  clearPassword(){
    const passwordField = document.querySelector("#password");
    if(passwordField == null){
      return;
    }
    (passwordField as HTMLInputElement).value = "";
  }

  register(){
    let cf: string = "", name: string = "", surname: string = "", birthDate: Date = new Date(), phoneNumber: string = "", email: string = "", address: string = "", password: string = "";
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((input) => {
      switch((input as HTMLInputElement).id){
        case "cf":
          cf = (input as HTMLInputElement).value;
          break;
        case "name":
          name = (input as HTMLInputElement).value;
          break;
        case "surname":
          surname = (input as HTMLInputElement).value;
          break;
        case "birthDate":
          birthDate = new Date((input as HTMLInputElement).value);
          break;
        case "phoneNumber":
          phoneNumber = (input as HTMLInputElement).value;
          break;
        case "email":
          email = (input as HTMLInputElement).value;
          break;
        case "address":
          address = (input as HTMLInputElement).value;
          break;
        case "password":
          password = (input as HTMLInputElement).value;
          break;
      }
    });
    this._register(cf, name, surname, birthDate, phoneNumber, email, address, password);
  }

  _register(cf: string, name: string, surname: string, birthDate: Date, phoneNumber: string, email: string, address: string, password: string){
    const subscriptionDate = new Date();
    this.loginService.register(cf, name, surname, birthDate, phoneNumber, email, address, password, subscriptionDate);
    this.logged = true;
  }

  logout() {
    this.loginService.logout();
    this.loginStateChange.emit(this.loginService.token);
    this.clearFields();
    this.logged = false;
  }

}
