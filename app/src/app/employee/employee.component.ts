import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] =["2","3","4","5","6"]
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: any[]) => {
        this.dataSource = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          this.loadEmployees();
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }
}
