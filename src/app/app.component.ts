import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './Components/ProductComponents/products/products.component';
import { ProductDetailsComponent } from './Components/ProductComponents/product-details/product-details.component';
import { CartComponent } from './Components/ProductComponents/cart/cart.component';
import { NotFoundComponent } from './Components/defaultComponents/not-found/not-found.component';
import { NavBarComponent } from './Components/defaultComponents/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/defaultComponents/footer/footer.component';
import { ContactUsComponent } from './Components/defaultComponents/contact-us/contact-us.component';
import { AboutComponent } from './Components/defaultComponents/about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductsComponent,ProductDetailsComponent,CartComponent,NotFoundComponent
,NavBarComponent,FooterComponent,ContactUsComponent,AboutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E_Commerce_App';
}
