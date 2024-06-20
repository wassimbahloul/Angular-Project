import { Component } from '@angular/core';
import { FruitService } from '../../Services/fruit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LegumeService } from '../../Services/legume.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrl: './vente.component.css'
})
export class VenteComponent {
  dataSource: any[] = []; // Déclare une propriété pour stocker les données des fruits
  dataSource2: any[] = [];
  displayedColumns: string[] = [ '2', '3', '4','5','6']; 
  employeeId: string | null = null;
  constructor(private cartService: CartService,private fruitService: FruitService,private legumeService: LegumeService,private router: Router, private activatedRoute: ActivatedRoute) { } // Injecte le service FruitService

  ngOnInit(): void {
    this.employeeId = localStorage.getItem('employeeId');
  console.log(this.employeeId);
  if (!this.employeeId ) {
    // Redirection vers la page de connexion
    this.router.navigate(['/']);
  } else {
    // Continuer avec le chargement de la facture
console.log("")
  }
    this.legumeService.getLegumes()
    .subscribe(data => {
      // Stockez les données récupérées dans la propriété dataSource
      this.dataSource2 = data;
    });
   
    // Appelle la méthode getFruits() du service FruitService pour récupérer les données des fruits
    this.fruitService.getFruits()
      .subscribe(data => {
        // Stocke les données récupérées dans la propriété dataSource
        this.dataSource = data;
      });

      
  }

  get fruitDataSourceChunked(): any[][] {
    const chunkSize = 3; // ou 4, selon votre choix
    const chunks = [];

    for (let i = 0; i < this.dataSource.length; i += chunkSize) {
      chunks.push(this.dataSource.slice(i, i + chunkSize));
    }

    return chunks;
  }

  get vegetableDataSourceChunked(): any[][] {
    const chunkSize = 3; // ou 4, selon votre choix
    const chunks = [];

    for (let i = 0; i < this.dataSource2.length; i += chunkSize) {
      chunks.push(this.dataSource2.slice(i, i + chunkSize));
    }

    return chunks;
  }

  addToCart(product: any):void {
    // Ajoutez ici la logique pour ajouter le produit au panier
    // Par exemple, vous pouvez stocker les produits dans un tableau ou utiliser un service de panier
    this.cartService.addToCart(product);
  }
  
}
