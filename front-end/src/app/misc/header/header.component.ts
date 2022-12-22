import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() bg_color = "transparent";
  background_color: string = "background-color: " + this.bg_color;
  
  menuItems = [
    {
      name: "Abbonamenti",
      link: "/abbonamenti"
    },
    {
      name: "Corsi",
      link: "/corsi"
    },
    {
      name: "Shop",
      link: "/shop"
    },
    {
      name: "Contattaci",
      link: "/contattaci"
    }
  ]

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.background_color = "background-color: " + this.bg_color + ";";
    let login_tmp = document.querySelector(".center-login");
    if(login_tmp == null){
      return;
    }
    const login = login_tmp as HTMLElement;
    login.style.display = "none";
  }

  toggleLogin(){
    let login_tmp = document.querySelector(".center-login");
    if(login_tmp == null){
      return;
    }
    const login = login_tmp as HTMLElement;
    console.log("before -> " + login.style.display)
    if(login.style.display == "none"){
      login.style.display = "flex";
    }else{
      login.style.display = "none";
    }
    console.log("after -> " + login.style.display);
    document.getElementById
  }

  
}
