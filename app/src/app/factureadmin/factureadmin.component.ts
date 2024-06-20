import { Component, OnInit } from '@angular/core';
import { FactureadminService } from '../../Services/factureadmin.service';

@Component({
  selector: 'app-factureadmin',
  templateUrl: './factureadmin.component.html',
  styleUrls: ['./factureadmin.component.css']
})
export class FactureadminComponent implements OnInit {
  factures: any[] = [];
  dataSource: any[] = [];

  constructor(private factureService: FactureadminService) { }

  ngOnInit(): void {
    this.loadFactures();
  }

  get dataSourceChunked(): any[][] {
    const chunkSize = 3; // ou 4, selon votre choix
    const chunks = [];

    for (let i = 0; i < this.dataSource.length; i += chunkSize) {
      chunks.push(this.dataSource.slice(i, i + chunkSize));
    }

    return chunks;
  }

  loadFactures(): void {
    this.factureService.getFactures().subscribe(
      factures => {
        this.factures = factures;
      },
      error => {
        console.error('Une erreur s\'est produite lors du chargement des factures :', error);
      }
    );
  }
}
