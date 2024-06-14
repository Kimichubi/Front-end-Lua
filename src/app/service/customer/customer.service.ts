import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../interface/Customer';
import { Product } from '../../interface/Product';

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

  creatNewCustomer(data: {
    name: string;
    address: string;
    products: { connect: [{ id: number }] };
  }): Observable<Customer> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.post<Customer>(`${this.baseUrl}/customer/create`, body, {
      headers: header,
    });
  }
  getOneCustomerById(id: number): Observable<Customer> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Customer>(`${this.baseUrl}/customer/one?id=${id}`, {
      headers: header,
    });
  }

  updatedCustomerInfos(data: {
    id: number;
    name?: string;
    address?: string;
    products?: { connect: { id: number } };
  }): Observable<Customer> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put<Customer>(`${this.baseUrl}/customer/update`, body, {
      headers: header,
    });
  }
}
