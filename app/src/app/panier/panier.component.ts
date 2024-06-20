import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { LegumeService } from '../../Services/legume.service';
import { FruitService } from '../../Services/fruit.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'] // Utilisez styleUrls au lieu de styleUrl
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];
  cartItemsf: any[] = [];
  constructor(private cartService: CartService,private legumeService: LegumeService,private fruitService: FruitService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItemsf =this.cartItems ;
    
    this.carteitemsfupdate();
  }

  updateTotal(product: any) :void{
    // Mettre à jour le total du produit dans le panier
    // Ceci peut être implémenté en fonction de votre logique métier
  }
  onQuantityChange(product: any, index: number): number {
    // Assurez-vous que le produit et la quantité sont valides
    if (product && product.quantity && product.prix_kilo) {
      // Obtenez la quantité saisie pour le produit spécifique
      const inputElement = document.getElementById('quantity' + index) as HTMLInputElement;
      const inputValue = inputElement.value ? parseInt(inputElement.value, 10) : 0;
  
      // Vérifiez si la quantité saisie est inférieure à la quantité disponible du produit
      if (inputValue <= product.quantity) {
        // Retournez le prix total du produit
    
        return inputValue * product.prix_kilo;
     
      } else {
        // Affichez un message d'erreur ou prenez une autre action appropriée
        alert('La quantité saisie dépasse la quantité disponible du produit.');
        // Retournez NaN si la quantité saisie est supérieure à la quantité disponible
        return NaN;
      }
       // Mettre à jour la quantité dans cartItems
      
    }
    
    // Retournez 0 si le produit ou la quantité n'est pas valide
    return 0;
  }
  updatedata(): void {
    for (let i = 0; i < this.cartItems.length; i++) {
      let product = this.cartItems[i];
   
      // Mettre à jour la quantité du produit dans le cartItems
      const inputElement = document.getElementById('quantity' + i) as HTMLInputElement;
      const inputValue = inputElement.value ? parseInt(inputElement.value, 10) : 0;
      product.quantity = product.quantity-inputValue;
    // Mettre à jour les cartItems dans le service
 }

     // Assurez-vous que le produit et la quantité sont valides
     this.cartService.updateCartItems(this.cartItems);
     this.cartItems = this.cartService.getCartItems();
    // Parcourir les produits pour les mettre à jour dans la base de données
    for (let i = 0; i < this.cartItems.length; i++) {
      let product = this.cartItems[i];
   
     
  
      // Mettre à jour le produit dans la base de données en fonction de son type

        this.fruitService.updateFruit(product._id, product).subscribe(response => {
          console.log('Quantité de fruit mise à jour dans la base de données.');})
       
    
        this.legumeService.updateLegume(product._id, product).subscribe(response => {
          console.log('Quantité de légume mise à jour dans la base de données.');
        })
      }
    
  }
  carteitemsfupdate():void{
    for (let i = 0; i < this.cartItemsf.length; i++) {
      let product = this.cartItemsf[i];
   
      // Mettre à jour la quantité du produit dans le cartItems
      const inputElement = document.getElementById('quantity' + i) as HTMLInputElement;
      const inputValue = inputElement.value ? parseInt(inputElement.value, 10) : 0;
      product.quantity = inputValue;
    // Mettre à jour les cartItems dans le service
 }
 this.cartService.updateCartItemsf(this.cartItemsf);

  }
  
  clearQuantityInput(): void {
    const inputElement = document.getElementById('quantité') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ''; // Effacez la valeur de l'entrée
    }}
}
