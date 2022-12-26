import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { loginUrl, logoutUrl } from 'src/app/shared/routes';
import * as cryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token: string | undefined = undefined;

  constructor(private httpClient: HttpClient) { }

  @Output() loginStateChange = new EventEmitter<string | undefined>();

  login(email: string, password: string) {
    const _password = this.hashPassword(password);
    const req = this.httpClient.post(loginUrl, { email, password }).subscribe((res) => {
      req.unsubscribe();
      console.log(res);
      this.token = (res as any).token;
      this.loginStateChange.emit(this.token);
    })
  }

  //cf, name, surname, birthDate, phoneNumber, email, address, password, subscriptionDate
  register(cf: string, name: string, surname: string, birthDate: Date, phoneNumber: string, email: string, address: string, password: string, subscriptionDate: Date) {
    const _password = this.hashPassword(password);
    const req = this.httpClient.put(loginUrl, { cf, name, surname, birthDate, phoneNumber, email, address, password, subscriptionDate }).subscribe((res) => {
      req.unsubscribe();
      console.log(res);
      this.token = (res as any).token;
      this.loginStateChange.emit(this.token);
    })
  }

  logout() {
    this.httpClient.post(logoutUrl, { token: this.token });
    this.token = undefined;
    this.loginStateChange.emit(this.token);
  }

  hashPassword(password: string) {
    return CryptoJS.SHA256(password).toString();
  }
}
