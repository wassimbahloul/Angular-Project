import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { login: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:3001/login', credentials)
      .pipe(
        tap((response: any) => {
          // Stocker l'identifiant de l'employé dans le localStorage
          localStorage.setItem('employeeId', response.employeeId);
        })
      );
  }

  // Fonction pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    // Vérifier si l'identifiant de l'employé est présent dans le localStorage
    return !!localStorage.getItem('employeeId');
  }

  // Fonction pour déconnecter l'utilisateur
  logout(): void {
    // Supprimer l'identifiant de l'employé du localStorage
    localStorage.removeItem('employeeId');
    // Rediriger vers la page de connexion
    this.router.navigate(['/']);
  }
}
