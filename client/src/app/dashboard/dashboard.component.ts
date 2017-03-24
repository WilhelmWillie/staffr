import { Component, OnInit } from '@angular/core';

import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  employees: Employee[];
  currentEmployee : Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    // On initialization, load all employees and store in array
    this.employeeService.getEmployees()
        .then(employees => this.employees = employees);
  }

  inspect(employee : Employee): void {
    if (this.currentEmployee == employee) {
      // Toggle inspect if we're already looking at this employee
      this.currentEmployee = null;
    } else {
      // But if we're not looking at this employee already, switch detail view to this one
      this.currentEmployee = employee;
    }
  }

  delete(employee : Employee): void {
    // If we're currently inspecting the employee we want to remove, de-inspect
    if (this.currentEmployee == employee) {
      this.currentEmployee = null;
    }

    // Use service to interface with API
    this.employeeService
      .deleteEmployee(employee.id)
      .then(() => {
        // Once deletion is succesful, update on the front end
        this.employees = this.employees.filter(e => e !== employee);
      });
  }
}
