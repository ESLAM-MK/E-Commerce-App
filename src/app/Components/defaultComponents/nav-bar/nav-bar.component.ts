import { NgClass } from '@angular/common';
import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgClass],  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @ViewChild('navbar') navbarElement!: ElementRef;

  // Tracks whether the navbar is sticky or not
  isSticky = false;

  // Listen to window scroll events
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = this.navbarElement.nativeElement;

    // If pageYOffset is greater than the initial height of the navbar, make it sticky
    if (window.pageYOffset > navbar.offsetTop) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}
