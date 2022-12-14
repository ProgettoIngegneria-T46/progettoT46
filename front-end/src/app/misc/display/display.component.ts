import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';
import { productsUrl, productUrl } from 'src/app/shared/roots';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit{
  constructor() { 
    
  }

  ngOnInit() {
    this.imgUrl = productUrl + this.product.id + "/image";
  }
  
  imgUrl = productUrl + "/none/image";
  @Input() product: Product = {
    id: "none",
    name: "none",
    price: 0.00
  }
  // @Input() imgUrl = "http://localhost:3000/product/123456/image";
}
