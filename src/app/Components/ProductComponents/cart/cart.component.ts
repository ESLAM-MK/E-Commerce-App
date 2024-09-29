import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductserviceService } from '../../../Services/productservice.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Use 'styleUrls' instead of 'styleUrl'
})
export class CartComponent {
  items: any[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  path !:string

  constructor(private prodServ: ProductserviceService) {}

  ngOnInit() {
    this.loadCartItems();
    this.calculateTotal();
  }

  loadCartItems() {
    this.prodServ.getCartItems().subscribe((data: any[]) => {
      this.items = data;
      this.calculateTotal();
    });
  }

  removeFromCart(productId: number) {
    this.prodServ.removeFromCart(productId).subscribe(() => {
      this.loadCartItems(); // Refresh cart items
    });
  }

  decreaseQuantity(item: any): void {
    if(item.quantity>1){
    item.quantity--;
    this.prodServ.updateCartQuantity(item.id, item.quantity).subscribe(() => {
      this.calculateTotal();

    });}

  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.prodServ.updateCartQuantity(item.id, item.quantity).subscribe(() => {
      this.calculateTotal();
    });
  }

  getTotalQuantity(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  }


  calculateTotal() {
    this.totalQuantity = this.getTotalQuantity();
    this.totalPrice = this.getTotalPrice();
  }
  checkItems():string{
    if(this.items.length>0){
      this.path="/payment"
    }
    else {
      this.path="/cart"
    }
    return this.path
  }
}
