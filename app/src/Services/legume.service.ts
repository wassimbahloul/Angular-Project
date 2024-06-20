import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LegumeService {
  constructor(private http: HttpClient) { }

  getLegumes() {
    return this.http.get<any[]>('http://localhost:3001/legumes');
  }

  addLegume(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3001/createlegume', data);
  }

  getLegumeById(id: string): Observable<any> {
    const url = `http://localhost:3001/legume/${id}`;
    return this.http.get<any>(url);
  }

  updateLegume(id: string, data: any): Observable<any> {
    const url = `http://localhost:3001/updatelegume/${id}`;
    return this.http.put<any>(url, data);
  }

  deleteLegume(id: string): Observable<any> {
    const url = `http://localhost:3001/deletelegume/${id}`;
    return this.http.delete<any>(url);
  }
}
