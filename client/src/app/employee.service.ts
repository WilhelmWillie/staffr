import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './models/employee';

@Injectable()
export class EmployeeService {
  private employeesUrl = '/api/employee';
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) { }

  // Sends GET request to API to get all employees in database as a JSON object
  getEmployees(): Promise<Employee[]> {
    return this.http.get(this.employeesUrl)
               .toPromise()
               .then(response => response.json() as Employee[])
               .catch(this.handleError);
  }

  // Sends POST request to API to add an employee to the database 
  addEmployee(employee): Promise<Employee> {
    return this.http
      .post(this.employeesUrl, JSON.stringify(employee), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Sends DELETE request to API to delete an employee from database (based on ID)
  deleteEmployee(id: number): Promise<void> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // Sends PUT request to API to delete a specific employee in the database
  updateEmployee(employee): Promise<void> {
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http.put(url, JSON.stringify(employee), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
