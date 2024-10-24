import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

interface Product {
  name: string;
  description: string;
  price: number;
  listPrice: number;
  stock: number;
  selectedQuantity: number;
  image: string;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule] // Import CommonModule and FormsModule
})
export class AppComponent {
  products: Product[] = [
    {
      name: 'OnePlus 12',
      description: 'The OnePlus 12 is a smartphone that was designed and manufactured by OnePlus Inc.',
      price: 699,
      listPrice: 799,
      stock: 20, // Set available stock quantity
      selectedQuantity: 1, // Default quantity set to 1
      image: 'https://github.com/mitalibafna4/Shopping-Website/raw/main/assets/oneplus12.jpg'
    },
    {
      name: 'Xiaomi Mi 12',
      description: 'The Xiaomi Mi 12 is a smartphone that was designed and manufactured by Xiaomi Inc.',
      price: 599,
      listPrice: 699,
      stock: 30,
      selectedQuantity: 1,
      image: 'https://github.com/mitalibafna4/Shopping-Website/raw/main/assets/xiomi12.png'
    },
    {
      name: 'iPhone 15',
      description: 'The iPhone 15 is a smartphone developed by Apple Inc.',
      price: 999,
      listPrice: 1099,
      stock: 15,
      selectedQuantity: 1,
      image: 'https://github.com/mitalibafna4/Shopping-Website/raw/main/assets/iphone15.png'
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      description: 'The Samsung Galaxy S24 Ultra is a high-end smartphone with an impressive camera system.',
      price: 1199,
      listPrice: 1299,
      stock: 20,
      selectedQuantity: 1,
      image: 'https://github.com/mitalibafna4/Shopping-Website/raw/main/assets/s24ultra.jpg'
    },
    {
      name: 'Google Pixel 8',
      description: 'The Google Pixel 8 offers the best of Google with excellent photography capabilities.',
      price: 799,
      listPrice: 899,
      stock: 25,
      selectedQuantity: 1,
      image: 'https://github.com/mitalibafna4/Shopping-Website/raw/main/assets/pixel8.jpg'
    }
  ];

  cart: CartItem[] = []; // Define cart with CartItem type
  isCartVisible = false;

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  updateQuantity(event: Event, product: Product) {
    const input = event.target as HTMLInputElement;
    product.selectedQuantity = +input.value;
  }

  addToCart(product: Product) {
    // Validation logic
    if (product.selectedQuantity > product.stock || product.selectedQuantity <= 0) {
      alert('Requested quantity is not available');
      return;
    }

    // Update stock and add to cart
    const existingItem = this.cart.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += product.selectedQuantity; // Add to existing quantity
    } else {
      this.cart.push({
        name: product.name,
        price: product.price,
        quantity: product.selectedQuantity
      });
    }

    product.stock -= product.selectedQuantity; // Update the stock
    product.selectedQuantity = 1; // Reset selected quantity to default

    // Show the cart modal automatically
    this.isCartVisible = true; 
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
