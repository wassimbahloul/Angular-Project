import { Component, OnInit } from '@angular/core';
import { FruitService } from '../../Services/fruit.service';
import { EmployeeService } from '../../Services/employee.service';
import { LegumeService } from '../../Services/legume.service';
import { FactureadminService } from '../../Services/factureadmin.service';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fruits: any[] = [];
  employees: any[] = [];
  vegetables: any[] = [];
  employeeTotals: any[] = [];
  pieChartData: ChartDataset[] = [];
  pieChartLabels: string[] = [];
  lineChartData: ChartDataset[] = [];
  lineChartLabels: string[] = [];
  vegetableChartData: ChartDataset[] = [];
  vegetableChartLabels: string[] = [];
  employeeWeightChartData: ChartDataset[] = [];
  employeeWeightChartLabels: string[] = [];
  employeeAmountChartData: ChartDataset[] = [];
  employeeAmountChartLabels: string[] = [];
  pieChartOptions: any = {
    responsive: true,
    legend: {
      position: 'top',
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  lineChartOptions: any = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(
    private fruitService: FruitService,
    private employeeService: EmployeeService,
    private vegetableService: LegumeService,
    private employeeFactureService: FactureadminService
  ) { }

  ngOnInit(): void {
    this.displayPie();
    this.displayLine();
    this.displayVegetableLine();
    this.displayEmployeeTotals();  // Fetch and display employee totals
  }

  displayPie() {
    this.fruitService.getFruits().subscribe((fruits) => {
      this.pieChartData = fruits.map(fruit => ({
        data: [fruit.quantity],
        label: fruit.name
      }));
      this.pieChartLabels = fruits.map(fruit => fruit.name);
    });
  }

  displayLine() {
    this.employeeService.getEmployees().subscribe((employees: any[]) => {
      this.lineChartData = [{
        data: employees.map(employee => employee.salaire),
        label: 'Salaries'
      }];
      this.lineChartLabels = employees.map(employee => employee.name);
    });
  }

  displayVegetableLine() {
    this.vegetableService.getLegumes().subscribe((vegetables: any[]) => {
      this.vegetableChartData = [{
        data: vegetables.map(vegetable => vegetable.quantity),
        label: 'Quantities'
      }];
      this.vegetableChartLabels = vegetables.map(vegetable => vegetable.name);
    });
  }

  displayEmployeeTotals() {
    this.employeeService.getEmployees().subscribe((employees: any[]) => {
      this.employees = employees; // Assurez-vous de récupérer les employés pour les utiliser dans les graphiques
      this.employeeFactureService.getFactures().subscribe((factures: any[]) => {
        this.employeeWeightChartData = this.employees.map(employee => {
          const facture = factures.find(f => f.employeeId === employee._id);
          return {
            
            data: factures.map(facture => facture.totalWeight),
            label: "totalWeight"
          };
        });
  
        this.employeeWeightChartLabels = this.employees.map(employee => employee.name);
  
        this.employeeAmountChartData = this.employees.map(employee => {
          const facture = factures.find(f => f.employeeId === employee._id);
          return {
            data: factures.map(facture => facture.totalAmount),
            label:"totalAmount"
          };
        });
  
        this.employeeAmountChartLabels = this.employees.map(employee => employee.name);
        
      });
    });
  }
}
