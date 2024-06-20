import { NgModule  } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FruitComponent } from './fruit/fruit.component';
import { MatTableModule } from '@angular/material/table';
import { FruitFormComponent } from './fruit-form/fruit-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { LegumeComponent } from './legume/legume.component';
import { LegumeFormComponent } from './legume-form/legume-form.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { VenteComponent } from './vente/vente.component';
import { PanierComponent } from './panier/panier.component';
import { FactureComponent } from './facture/facture.component';
import { LoginComponent } from './login/login.component';
import { FactureadminComponent } from './factureadmin/factureadmin.component';
import {  NgChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Layout1Component } from './layout1/layout1.component';


@NgModule({
  declarations: [
    AppComponent,
    FruitComponent,
    FruitFormComponent,
    LayoutComponent,
    LegumeComponent,
    LegumeFormComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    VenteComponent,
    PanierComponent,
    FactureComponent,
    LoginComponent,
    FactureadminComponent,
    DashboardComponent,
    Layout1Component,
   
  ],
  imports: [
    NgChartsModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
