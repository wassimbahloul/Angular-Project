import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router à partir de '@angular/router'
import { LoginService } from '../../Services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})export class LoginComponent implements OnInit{
  loginData = { login: '', password: '' };
  errorMessage = '';
ngOnInit(): void {

    // Supprimer l'employeeId du localStorage
    localStorage.removeItem('employeeId');
   
  
}
  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    if (this.loginData.login === 'admin' && this.loginData.password === 'admin') {
      console.log('Admin connecté');
      localStorage.setItem('employeeId', 'admin');
      localStorage.setItem('password', 'admin');
      this.router.navigate(['/fruits']);
    } else {
    this.loginService.login(this.loginData).subscribe(
      (res) => {
        console.log('Connexion réussie');
        // Naviguer vers '/fruits' après une connexion réussie
        this.router.navigate(['/vente']); 

        // Aucun besoin de stocker l'identifiant ici car il est déjà stocké dans le service
      },
      (err) => {
        console.error('Erreur lors de la connexion', err);
        this.errorMessage = 'Identifiants incorrects';
        // Gérer l'erreur, afficher un message à l'utilisateur, etc.
      }
    );
  }
  }
  // Méthode pour vérifier si un employé est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('employeeId');
  }
}

