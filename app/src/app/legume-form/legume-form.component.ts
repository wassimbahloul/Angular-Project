import { Component, OnInit } from '@angular/core';
import { LegumeService } from '../../Services/legume.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-legume-form',
  templateUrl: './legume-form.component.html',
  styleUrls: ['./legume-form.component.css']
})
export class LegumeFormComponent implements OnInit {
  form!: FormGroup;
  idcourant: any; // Propriété pour stocker l'ID courant

  constructor(private fb: FormBuilder, private legumeService: LegumeService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer l'ID de la route courante
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!this.idcourant) {
      this.legumeService.getLegumeById(this.idcourant).subscribe(
        (legume) => {
          this.initForm(legume); // Initialiser le formulaire avec les données du légume
        },
        (error) => {
          console.error('Erreur lors de la récupération du légume :', error);
        }
      );
    } else {
      this.initForm(null); // Initialiser un formulaire vide pour la création
    }
  }

  initForm(legumeData: any): void {
    if (legumeData) {
      this.form = this.fb.group({
        name: [legumeData.name, [Validators.required]],
        quantity: [legumeData.quantity, [Validators.required]],
        prix_kilo: [legumeData.prix_kilo, [Validators.required]],
        image: [legumeData.image, [Validators.required]]
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
        // Mettre à jour le légume existant
        this.legumeService.updateLegume(this.idcourant, formData).subscribe(
          () => {
            this.router.navigate(['/legumes']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du légume :', error);
          }
        );
      } else {
        // Ajouter un nouveau légume
        this.legumeService.addLegume(formData).subscribe(
          () => {
            this.router.navigate(['/legumes']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du légume :', error);
          }
        );
      }
    }
  }
}
