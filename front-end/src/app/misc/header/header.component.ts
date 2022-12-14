import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
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
}
