import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsf: any[] = [];
  constructor() { }

  addToCart(product: any): void {
    // Vérifier si un produit avec le même ID existe déjà dans le panier
    const isProductInCart = this.cartItems.some((item: any) => item._id === product._id);
    
    // Si le produit n'est pas déjà dans le panier, l'ajouter
    if (!isProductInCart) {
        this.cartItems.push(product);
    } else {
        alert("Le produit existe déjà dans le panier.");
        // Ou vous pouvez choisir de ne pas l'ajouter et gérer cette situation d'une autre manière
    }
}

  getCartItems() {
    return this.cartItems;
  }
  updateCartItems(newCartItems: any[]): void {
    this.cartItems = newCartItems;
  }
  
  addToCartf(product: any):void {
    this.cartItemsf.push(product);
  }

  getCartItemsf() {
    return this.cartItemsf;
  }
  updateCartItemsf(newCartItems: any[]): void {
    this.cartItemsf = newCartItems;
  }
}
