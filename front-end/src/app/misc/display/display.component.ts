import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  imgUrl = "https://www.w3schools.com/w3images/jeans3.jpg";
  name: string = "none";
  price = 0.00;
}
