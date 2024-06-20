import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FruitService } from '../../Services/fruit.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fruit-form',
  templateUrl: './fruit-form.component.html',
  styleUrls: ['./fruit-form.component.css']
})
export class FruitFormComponent implements OnInit {
  form!: FormGroup;
  idcourant: any; // Propriété pour stocker l'ID courant
  employeeId: string | null = null;
  constructor(private fb: FormBuilder, private fruitService: FruitService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.employeeId = localStorage.getItem('employeeId');
  console.log(this.employeeId);
 
  // Vérifier si l'employeeId est null
  if (!this.employeeId ) {
    // Redirection vers la page de connexion
    this.router.navigate(['/']);
  } else {
    // Continuer avec le chargement de la facture
console.log("")
  }
 // Récupérer l'élément input par son ID
  // Déclaration de la propriété imageInput
  const imageInput: HTMLInputElement | null = null; // Initialisé à null
    // Récupérer l'ID de la route courante
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!this.idcourant) {
      this.fruitService.getFruitById(this.idcourant).subscribe(
        (fruit) => {
          this.initForm(fruit); // Initialiser le formulaire avec les données du fruit
        },
        (error) => {
          console.error('Erreur lors de la récupération du fruit :', error);
        }
      );
    } else {
      this.initForm(null); // Initialiser un formulaire vide pour la création
    }
  }
  initForm(fruitData: any): void {
    if (fruitData) {
      this.form = this.fb.group({
        name: [fruitData.name, [Validators.required]],
        quantity: [fruitData.quantity, [Validators.required]],
        prix_kilo: [fruitData.prix_kilo, [Validators.required]],
        image: [fruitData.image, [Validators.required]]
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        prix_kilo: ['', [Validators.required]],
        image: ['', [Validators.required]]
      });
    }
  }
  



  onsub() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (!!this.idcourant) {
        // Mettre à jour le fruit existant
        this.fruitService.updateFruit(this.idcourant, formData).subscribe(
          () => {
            this.router.navigate(['/fruits']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du fruit :', error);
          }
        );
      } else {
        // Ajouter un nouveau fruit
        this.fruitService.addFruit(formData).subscribe(
          () => {
            this.router.navigate(['/fruits']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du fruit :', error);
          }
        );
      }
    }
  }

  
}
