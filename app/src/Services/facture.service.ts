import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:3001/facture'; // URL de l'API pour les factures

  constructor(private http: HttpClient) { }

  // Méthode pour créer une nouvelle facture
  createFacture(facture: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, facture);
  }
}
