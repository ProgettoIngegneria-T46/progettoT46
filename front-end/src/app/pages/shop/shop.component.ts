import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';
import { productsUrl } from 'src/app/shared/roots';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  products: Product[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(productsUrl).subscribe((data) => {
      this.products = data as Product[];
    });
  }

  funzione() {
console.log("funzione");
  }
}
