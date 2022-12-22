import { Component, Input, OnInit } from '@angular/core';

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


  ngOnInit(): void {
    this.background_color = "background-color: " + this.bg_color + ";";
  }
}
