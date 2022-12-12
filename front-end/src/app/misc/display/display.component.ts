import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  id: string = "123456"
  imgUrl = "http://localhost:3000/product/123456/image";
  name: string = "none";
  price = 0.00;
}
