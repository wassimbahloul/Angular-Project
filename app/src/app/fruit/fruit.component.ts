import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FruitService } from '../../Services/fruit.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.css']
})
export class FruitComponent implements OnInit {

  dataSource: any[] = []; // Déclare une propriété pour stocker les données des fruits
  employeeId: string | null = null;
  displayedColumns: string[] = [ '2', '3', '4','5','6']; 
  constructor(private fruitService: FruitService,private router: Router, private activatedRoute: ActivatedRoute) { } // Injecte le service FruitService

  ngOnInit(): void {
    this.employeeId = localStorage.getItem('employeeId');
  console.log(this.employeeId);
 
  // Vérifier si l'employeeId est null
 
    // Appelle la méthode getFruits() du service FruitService pour récupérer les données des fruits
    this.fruitService.getFruits()
      .subscribe(data => {
        // Stocke les données récupérées dans la propriété dataSource
        this.dataSource = data;
      });
  }
  // Fonction pour diviser un tableau en sous-tableaux de taille donnée

  // Méthode pour découper le tableau de données en groupes de 3 ou 4 éléments
  get dataSourceChunked(): any[][] {
    const chunkSize = 3; // ou 4, selon votre choix
    const chunks = [];

    for (let i = 0; i < this.dataSource.length; i += chunkSize) {
      chunks.push(this.dataSource.slice(i, i + chunkSize));
    }

    return chunks;
  }
  // Ajoute la fonction ondelete() pour gérer la suppression d'un fruit
  ondelete(id: any): void {
    console.log('Suppression du fruit avec ID :', id);
    this.fruitService.deleteFruit(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(fruit => fruit._id !== id);
      this.router.navigate(['/fruits']);
    });
  }
}  