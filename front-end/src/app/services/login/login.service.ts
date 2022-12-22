import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUrl, logoutUrl } from 'src/app/shared/routes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token: string | undefined = undefined;

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    const req = this.httpClient.post(loginUrl, { email, password }).subscribe((res) => {
      req.unsubscribe();
      console.log(res);
      this.token = (res as any).token;
    })
  }

  //cf, name, surname, birthDate, phoneNumber, email, address, password, subscriptionDate
  register(cf: string, name: string, surname: string, birthDate: Date, phoneNumber: string, email: string, address: string, password: string, subscriptionDate: Date){
    const req = this.httpClient.put(loginUrl, {cf, name, surname, birthDate, phoneNumber, email, address, password, subscriptionDate}).subscribe((res) => {
      req.unsubscribe();
      console.log(res);
      this.token = (res as any).token;
    })
  }

  logout() {
    this.httpClient.post(logoutUrl, { token: this.token });
    this.token = undefined;
  }
}
