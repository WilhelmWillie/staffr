import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  name: string;
  position: string;
  dept: string;
  phoneNumber: string;
  email: string;
  notes: string;

  // Click Add, create Employee, redirect to dashboard
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
  }

  addEmployee() {
    const emp = { 
      name: this.name,
      position: this.position, 
      department: this.dept,
      phoneNumber: this.phoneNumber,
      email: this.email,
      notes: this.notes
    }

    // Create employee object from form data, send it to API, then redirect back to the dashboard
    this.employeeService.addEmployee(emp).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

}
