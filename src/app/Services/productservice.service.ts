import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
//ok
@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private apiUrl = 'http://localhost:3000/api';  // Your backend URL

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getProductDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`);
  }

  addToCart(productId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cart`, { id: productId });
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart/${productId}`);
  }

  updateCartQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cart/quantity`, { id: productId, quantity });
  }

  getTotalPrice(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart/total`);
  }
}
