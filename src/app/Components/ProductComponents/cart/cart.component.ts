import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductserviceService } from '../../../Services/productservice.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  items:any[]=[]
  itemss:any[]=[]
  totalQuantity:number=0
   totalPrice:number =0
constructor(private prodServ:ProductserviceService){}
  ngOnInit() {
this.items =this.prodServ.getCartItems()

 }
 removeFromCart(productId:number){
  this.prodServ.removeFromCart(productId)

 }

getTotalPrice(): number {
  return this.prodServ.getTotalPrice()
}
decreaseQuantity(item: any): void {
  this.prodServ.decreaseQuantity(item)
}

// Method to increase the quantity of an item
increaseQuantity(item: any): void {
  this.prodServ.increaseQuantity(item)
}
getTotalQuantity():number{
  return this.prodServ.getTotalQuantity()
}


}
