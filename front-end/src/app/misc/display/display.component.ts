import { Component, Input, OnInit } from '@angular/core';
import { Course, Product } from 'src/app/shared/interfaces';
import { productsUrl, productUrl } from 'src/app/shared/routes';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
    if (this.item instanceof Product) {
      this.imgUrl = productUrl + this.item?.id + "/image";
    } else if (this.item instanceof Course) {
      this.imgUrl = productsUrl + this.item?.id + "/image";
    } else {
      this.imgUrl = productUrl + "none/image";
    }
  }

  imgUrl = productUrl + "none/image";
  @Input() item: Product | Course | undefined = undefined
  // @Input() imgUrl = "http://localhost:3000/product/123456/image";

  isProduct(item: Product | Course | undefined): boolean {
    return item instanceof Product;
  }

  isCourse(item: Product | Course | undefined): boolean {
    return item instanceof Course;
  }

  toProduct(item: Product | Course | undefined): Product | undefined {
    return item instanceof Product ? item : undefined;
  }

  toCourse(item: Product | Course | undefined): Course | undefined {
    return item instanceof Course ? item : undefined;
  }
}
