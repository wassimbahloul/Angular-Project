import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FruitService {
  constructor(private http: HttpClient) { }
  getFruits() {
    return this.http.get<any[]>('http://localhost:3001/fruits');
  }
  addFruit(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3001/createfruit', data);
  }
  getFruitById(id: string): Observable<any> {
    const url = `http://localhost:3001/fruit/${id}`; // Correction de l'URL sans les guillemets supplémentaires
    return this.http.get<any>(url);
  }

  updateFruit(id: string, data: any): Observable<any> {
    const url = `http://localhost:3001/updatefruit/${id}`;
    return this.http.put<any>(url, data);
  }
  deleteFruit(id: string): Observable<any> {
    const url = `http://localhost:3001/deletefruit/${id}`;
    return this.http.delete<any>(url);
  }
}

