import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private router: Router) {}

  déconnexion(): void {
    // Supprimer l'employeeId du localStorage
    localStorage.removeItem('employeeId');
    // Rediriger vers la page de connexion
    this.router.navigate(['/']);
  }
}
