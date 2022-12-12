import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  addProduct(name: string, image: string, price: string){
    //name is a string, image is a file, price is a string
    //send a request to the server to add the product

    //create a form data object
    const formData = new FormData();
    //add the name, image and price to the form data object
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    //send the request to the server
    fetch("http://localhost:3000/product/1", {
      method: "PUT",
      body: formData
    }).then( res => {
      console.log(res);
    });
  }

}
