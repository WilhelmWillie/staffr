import { Component, Input, OnInit } from '@angular/core';

import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() currentEmployee: Employee;
  editMode : boolean = false;

  // Employee Details
  name : string;
  position : string;
  dept : string;
  phoneNumber : string;
  email : string;
  notes : string;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  edit() {
    // Toggle edit
    this.editMode = !this.editMode;

    // Fill out form with data
    if (this.editMode == true) {
      this.name = this.currentEmployee.name;
      this.position = this.currentEmployee.position;
      this.dept = this.currentEmployee.department;
      this.phoneNumber = this.currentEmployee.phoneNumber;
      this.email = this.currentEmployee.email;
      this.notes = this.currentEmployee.notes;
    }
  }

  updateEmployee() {
    // Update the current employee to update the front end
    this.currentEmployee.name = this.name;
    this.currentEmployee.position = this.position;
    this.currentEmployee.department = this.dept;
    this.currentEmployee.phoneNumber = this.phoneNumber;
    this.currentEmployee.email = this.email;
    this.currentEmployee.notes = this.notes;

    // Update the back end when the update employee button is clicked
    this.employeeService.updateEmployee(this.currentEmployee).then(() => {
      this.editMode = false;
    });
  }
}
