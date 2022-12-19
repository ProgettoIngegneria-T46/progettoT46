import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token: string = '';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    const req = this.httpClient.post('http://localhost:3000/api/login', { email, password }).subscribe((res) => {
      console.log(res);
      this.token = (res as any).token;
    })
  }
}
