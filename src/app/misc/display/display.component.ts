import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @Input() title: string = 'Title';
  @Input() price: number = 0.00;
  @Input() imgUrl: string = '';
}
