import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitComponent } from './fruit/fruit.component';
import { FruitFormComponent } from './fruit-form/fruit-form.component';
import { LegumeComponent } from './legume/legume.component';
import { LegumeFormComponent } from './legume-form/legume-form.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeComponent } from './employee/employee.component';
import { VenteComponent } from './vente/vente.component';
import { PanierComponent } from './panier/panier.component';
import { FactureComponent } from './facture/facture.component';
import { LoginComponent } from './login/login.component';
import { FactureadminComponent } from './factureadmin/factureadmin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../Services/auth-guard.service';

const routes: Routes = [

  {
    path:'fruits',
    pathMatch:'full',
    children: [
      {
        path:'',
        component:FruitComponent
      },
      {
        path:'create',
        component:FruitFormComponent
      },
      {
        path:':id/edit',
        component:FruitFormComponent
      }
    ]
  },
  {
    path:'',
    pathMatch:'full',
    component:LoginComponent
  },
  {
    canActivate: [AuthGuardService],
    path:'facturee',
    component:FactureadminComponent
  },
  
  {
    canActivate: [AuthGuardService],
    path:'panier',
    component:PanierComponent
  },
  {
    canActivate: [AuthGuardService],
    path:'facture',
    component:FactureComponent
  },
  {
    
    path:'dashboard',
    component:DashboardComponent
  },
  {
    canActivate: [AuthGuardService],
    path:'vente',
    component:VenteComponent
  },
  {
    path:'employees',
    
    canActivate: [AuthGuardService],
    children: [
      {
        path:'',
        component:EmployeeComponent
      },
      {
        path:'createemploye',
        component:EmployeeFormComponent
      },
      {
        path:':id/editemployee',
        component:EmployeeFormComponent
      }
    ]
  },
  {
    path:'legumes',
   
    canActivate: [AuthGuardService],
    children: [
      {
        path:'',
        component:LegumeComponent
      },
      {
        path:'createlegume',
        component:LegumeFormComponent
      },
      {
        path:':id/editlegume',
        component:LegumeFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
