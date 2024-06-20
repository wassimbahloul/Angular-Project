import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { FactureService } from '../../Services/facture.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  cartItemsf: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private factureService: FactureService) { }

  ngOnInit(): void {
    this.cartItemsf = this.cartService.getCartItemsf();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItemsf.reduce((total, product) => {
      return total + (product.quantity * product.prix_kilo);
    }, 0);
  }
  clearCart(): void {
    this.cartItemsf = []; // Effacer le tableau des éléments du panier
  }
  saveFacture(): void {
    // Récupérer l'employeeId depuis le localStorage
    const employeeId = localStorage.getItem('employeeId');

    // Calculer le total de la quantité de tous les produits vendus
    const totalWeight = this.cartItemsf.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    // Créer un objet représentant la facture
    const newFacture = {
      employeeId,
      totalAmount: this.totalPrice,
      totalWeight
    };

    // Appeler le service pour enregistrer la facture
    this.factureService.createFacture(newFacture).subscribe(response => {
      console.log('Facture enregistrée avec succès :', response);
      // Effacer le panier après l'enregistrement de la facture
    
    }, error => {
      console.error('Erreur lors de l\'enregistrement de la facture :', error);
    });
  }
}
