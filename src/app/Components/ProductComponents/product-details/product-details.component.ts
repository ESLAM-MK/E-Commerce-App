import {  Component } from '@angular/core';
import { ProductserviceService } from '../../../Services/productservice.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  prodDetails:any={}
  id ! :number
  constructor(private prodserv:ProductserviceService, private route:ActivatedRoute){}
  ngOnInit() {
    this.id =Number(this.route.snapshot.paramMap.get('id'))
    this.prodDetails=this.prodserv.getProductDetails(this.id)
    console.log(this.prodDetails)
  }
  addToCart(product:any){
    this.prodserv.addToCart(product)
  }
  removeFromCart(productId:number){
    this.prodserv.removeFromCart(productId)
  }

}
