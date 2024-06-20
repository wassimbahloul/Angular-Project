import { Component, OnInit } from '@angular/core';
import { LegumeService } from '../../Services/legume.service'; // Importez le service LegumeService
import { Router } from '@angular/router';

@Component({
  selector: 'app-legume',
  templateUrl: './legume.component.html',
  styleUrls: ['./legume.component.css']
})
export class LegumeComponent implements OnInit {
  dataSource: any[] = []; // Déclare une propriété pour stocker les données des légumes
  // Méthode pour découper le tableau de données en groupes de 3 ou 4 éléments
  get dataSourceChunked(): any[][] {
    const chunkSize = 3; // ou 4, selon votre choix
    const chunks = [];

    for (let i = 0; i < this.dataSource.length; i += chunkSize) {
      chunks.push(this.dataSource.slice(i, i + chunkSize));
    }

    return chunks;
  }

  displayedColumns: string[] = ['name', 'quantity', 'prix_kilo', 'image', 'actions']; // Définir les colonnes à afficher

  constructor(private legumeService: LegumeService, private router: Router) { } // Injectez le service LegumeService

  ngOnInit(): void {
    // Appellez la méthode getLegumes() du service LegumeService pour récupérer les données des légumes
    this.legumeService.getLegumes()
      .subscribe(data => {
        // Stockez les données récupérées dans la propriété dataSource
        this.dataSource = data;
      });
  }

  // Fonction pour supprimer un légume
  ondelete(id: any): void {
    console.log('Suppression du légume avec ID :', id);
    this.legumeService.deleteLegume(id).subscribe(() => {
      // Filtrez le légume supprimé de la liste des légumes affichés
      this.dataSource = this.dataSource.filter(legume => legume._id !== id);
      // Naviguez vers la page des légumes après suppression
      this.router.navigate(['/legumes']);
    });
  }
}
