import { membershipsUrl, coursesUrl, productsUrl, productUrl, courseUrl, membershipUrl, notFoundImage} from './../../shared/routes';
import { Component, Input, OnInit } from '@angular/core';
import { Course, Product, Membership} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  constructor() {

  }
  
  imgUrl = "";
  
  ngOnInit() {
    if (this.item instanceof Product) {
      this.imgUrl = productUrl + this.item?.id + "/image";
    } else if (this.item instanceof Course) {
      this.imgUrl = courseUrl + this.item?.id + "/image";
    }else if (this.item instanceof Membership) {
      this.imgUrl = membershipUrl + this.item?.id + "/image";
    } else {
      this.imgUrl = notFoundImage;
    }
  }
  @Input() item: Product | Course | Membership | undefined = undefined
  // @Input() imgUrl = "http://localhost:3000/product/123456/image";

  isProduct(item: Product | Course | Membership | undefined): boolean {
    return item instanceof Product;
  }

  isCourse(item: Product | Course | Membership | undefined): boolean {
    return item instanceof Course;
  }

  toProduct(item: Product | Course | Membership | undefined): Product | undefined {
    return item instanceof Product ? item : undefined;
  }

  toCourse(item: Product | Course | Membership | undefined): Course | undefined {
    return item instanceof Course ? item : undefined;
  }

  isMembership(item: Product | Course | Membership | undefined): boolean {
    return item instanceof Membership;
  }

  toMembership(item: Product | Course | Membership | undefined): Membership | undefined {
    return item instanceof Membership ? item : undefined;
  }

  addToCart(){
    console.log("Not implemented yet!");
  }
}
