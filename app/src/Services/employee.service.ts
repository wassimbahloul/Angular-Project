import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Remplacez cette URL par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer tous les employés
  getEmployees(): Observable<any> {
    return this.http.get('http://localhost:3001/employees');
  }

  // Récupérer un employé par son ID
  getEmployeeById(id: string): Observable<any> {
    const url = `http://localhost:3001/employees/${id}`;
    return this.http.get(url);
  }

  // Ajouter un nouvel employé
  addEmployee(employeeData: any): Observable<any> {
    return this.http.post('http://localhost:3001/createemployee', employeeData);
  }

  // Mettre à jour les informations d'un employé existant
  updateEmployee(id: string, employeeData: any): Observable<any> {
    const url = `http://localhost:3001/employees/${id}`;
    return this.http.put(url, employeeData);
  }

  // Supprimer un employé par son ID
  deleteEmployee(id: string): Observable<any> {
    const url = `http://localhost:3001/employees/${id}`;
    return this.http.delete(url);
  }
}
