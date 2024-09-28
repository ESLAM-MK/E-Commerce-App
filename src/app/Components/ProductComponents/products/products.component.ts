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

  constructor(private prodServ: ProductserviceService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Subscribe to the observable to get the product list
    this.prodServ.getAllProducts().subscribe(data => {
      this.productListData = data;
      this.filteredProductListData = data; // Initialize filtered list
      console.log(this.filteredProductListData);
    });
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
}
