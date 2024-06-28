import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interface/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000';

  getAllProducts(page: number): Observable<Product[]> {
    const token = sessionStorage.getItem('token-api');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${this.baseUrl}/product?page=${page}`, {
      headers,
    });
  }

  getOneProduct(id: number): Observable<Product> {
    const token = sessionStorage.getItem('token-api');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product>(`${this.baseUrl}/product/one?id=${id}`, {
      headers,
    });
  }

  newProduct(data: {
    name: string;
    quantity: number;
    value: number;
    category: { connect: { id: number } };
  }): Observable<Product> {
    const token = sessionStorage.getItem('token-api');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(data);

    return this.http.post<Product>(`${this.baseUrl}/product/create`, body, {
      headers,
    });
  }
  updateProduct(data: {
    id: number;
    name: string;
    quantity: number;
    value: number;
  }): Observable<Product> {
    const token = sessionStorage.getItem('token-api');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(data);

    return this.http.put<Product>(`${this.baseUrl}/product/update`, body, {
      headers,
    });
  }
}
