import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../interface/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';
  getCustomers(page: number): Observable<Customer[]> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Customer[]>(`${this.baseUrl}/customer?page=${page}`, {
      headers: header,
    });
  }
}
