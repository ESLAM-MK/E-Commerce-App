import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductserviceService } from '../../../Services/productservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,NgClass,NgStyle],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productListData:any[]=[]
  searchName:string=' '
  filteredProductListData:any[]=[]
  constructor(private prodServ:ProductserviceService,private router:Router,private toastr: ToastrService){}
    ngOnInit(): void {
      this.productListData =this.prodServ.getAllProducts()
      this.filteredProductListData=this.prodServ.getAllProducts()
      console.log(this.filteredProductListData)
    }
    addToCart(product:any){
      this.prodServ.addToCart(product)
    }
    removeFromCart(productId:number){
      this.prodServ.removeFromCart(productId)
    }
    onKeyUp(name:string){
      this.searchName=name
      console.log(name)
      this.filteredProductListData =this.productListData.filter((product)=>{
        return  product.title.includes(this.searchName)}
      )
      }
      searchByName($event: Event){
        const input =$event.target as HTMLInputElement
        this.filteredProductListData =this.productListData.filter((product)=>{
         return  product.title.toLowerCase().includes(input.value.toLowerCase())
        })

      }
}
