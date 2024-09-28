import { Component } from '@angular/core';
import { ProductserviceService } from '../../../Services/productservice.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NgClass],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] 
})
export class ProductDetailsComponent {
  prodDetails: any = {};
  id!: number;

  constructor(private prodServ: ProductserviceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.prodServ.getProductDetails(this.id).subscribe(
      (data) => {
        this.prodDetails = data;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  addToCart(product: any) {
    this.prodServ.addToCart(product.id).subscribe(() => {
      console.log('Product added to cart');
    });
  }

  removeFromCart(productId: number) {
    this.prodServ.removeFromCart(productId).subscribe(() => {
      console.log('Product removed from cart');
    });
  }
}
