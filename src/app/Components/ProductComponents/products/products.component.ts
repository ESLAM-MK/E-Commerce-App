import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductserviceService } from '../../../Services/productservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NgClass, NgStyle],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productListData: any[] = [];
  searchName: string = '';
  filteredProductListData: any[] = [];
  catgoryList: any[] = [];
  price :number =3000
  constructor(private prodServ: ProductserviceService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Subscribe to the observable to get the product list
    this.prodServ.getAllProducts().subscribe(data => {
      this.productListData = data;
      this.filteredProductListData = data; // Initialize filtered list
      console.log(this.filteredProductListData);
       this.insertOptions()
    });
  }
 //remove dublicate item in catgoryList
  removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
  }
  //insert option into select
  insertOptions() {
    const selectElement = document.getElementById("Categories") as HTMLSelectElement

    for (let i = 0; i < this.productListData.length; i++) {
      this.catgoryList[i] = this.productListData[i].category
    }
    const uniqueNumbers = this.removeDuplicates(this.catgoryList)
    console.log(this.catgoryList)
    console.log(selectElement)
    for (let i = 0; i < uniqueNumbers.length; i++) {
      const option = document.createElement('option');
      option.value = uniqueNumbers[i]
      option.textContent = uniqueNumbers[i]
      selectElement.appendChild(option);
    }
  }
  addToCart(product: any) {
    if (product.incart) {
      // If the product is already in the cart, remove it
      this.removeFromCart(product.id);
      product.incart = false; // Update the incart status locally
    } else {
      // Add the product to the cart
      this.prodServ.addToCart(product.id).subscribe(response => {
        this.toastr.success('Product added to cart', 'Success');
        product.incart = true; // Update the incart status locally
      }, error => {
        this.toastr.error('Failed to add product to cart', 'Error');
      });
    }
  }

  removeFromCart(productId: number) {
    this.prodServ.removeFromCart(productId).subscribe(response => {
      this.toastr.success('Product removed from cart', 'Success');
    }, error => {
      this.toastr.error('Failed to remove product from cart', 'Error');
    });
  }


  onKeyUp(name: string) {
    this.searchName = name;
    console.log(name);
    this.filteredProductListData = this.productListData.filter((product) => {
      return product.title.includes(this.searchName);
    });
  }

  searchByName($event: Event) {
    const input = $event.target as HTMLInputElement;
    this.filteredProductListData = this.productListData.filter((product) => {
      return product.title.toLowerCase().includes(input.value.toLowerCase());
    });
  }
  filterByPrice($event: Event) {
    const input = $event.target as HTMLInputElement;
    this.price=Number(input.value)
    this.filteredProductListData = this.productListData.filter((product) => {
      return product.price <=input.value
    });
  }
   //filter by category
  filterCards($event: Event) {
    const input = $event.target as HTMLInputElement
    if (input.value.toLowerCase() == 'categories') {
      this.filteredProductListData = this.productListData
    } else {
      this.filteredProductListData = this.productListData.filter((product) => {
        return product.category.toLowerCase() == (input.value.toLowerCase())
      }
      );
    }

  }
}
