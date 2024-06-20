  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable, of } from 'rxjs';
  import { catchError } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class FactureadminService {
    private factures: any[] = [];

    constructor(private http: HttpClient) { }

    addQuantiteAndSoldeToFacture(newFacture: any): Observable<any> {
      // Vérifier si la facture existe déjà pour cet employé
      const existingFactureIndex = this.factures.findIndex(facture => facture.employeeId === newFacture.employeeId);

      if (existingFactureIndex !== -1) {
        // Si la facture pour cet employé existe déjà, ajouter les nouvelles quantités et soldes
        this.factures[existingFactureIndex].totalAmount += newFacture.totalAmount;
        this.factures[existingFactureIndex].totalWeight += newFacture.totalWeight;
        return of(this.factures);
      } else {
        // Sinon, ajouter une nouvelle facture
        this.factures.push(newFacture);
        return this.http.post<any>('http://localhost:3001/facture', newFacture).pipe(
          catchError(error => {
            console.error('Erreur lors de l\'ajout de quantité et solde à la facture :', error);
            return of(null);
          })
        );
      }
    }

    // Méthode pour récupérer toutes les factures
    getFactures(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:3001/facture');
    }
  }
