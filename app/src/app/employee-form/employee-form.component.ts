import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  form!: FormGroup;
  idcourant: any;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!this.idcourant) {
      this.employeeService.getEmployeeById(this.idcourant).subscribe(
        (employee) => {
          this.initForm(employee);
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'employé :', error);
        }
      );
    } else {
      this.initForm(null);
    }
  }

  initForm(employeeData: any): void {
    if (employeeData) {
      this.form = this.fb.group({
        name: [employeeData.name, [Validators.required]],
        address: [employeeData.address, [Validators.required]],
        tele: [employeeData.tele, [Validators.required]],
        salaire: [employeeData.tele, [Validators.required]],
        login: [employeeData.login, [Validators.required]],
        password: [employeeData.password, [Validators.required]]
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        tele: ['', [Validators.required]],
        salaire: ['', [Validators.required]],
        login: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }
  }

  onsub() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (!!this.idcourant) {
        this.employeeService.updateEmployee(this.idcourant, formData).subscribe(
          () => {
            this.router.navigate(['/employees']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'employé :', error);
          }
        );
      } else {
        this.employeeService.addEmployee(formData).subscribe(
          () => {
            this.router.navigate(['/employees']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'employé :', error);
          }
        );
      }
    }
  }
}