import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sell } from '../../interface/Sells';

@Injectable({
  providedIn: 'root',
})
export class SellsService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';
  getSells(page: number): Observable<Sell[]> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Sell[]>(`${this.baseUrl}/sell?page=${page}`, {
      headers: header,
    });
  }
  creatNewSell(data: {
    sellData: {
      dateOfSell: string;
      dateToInstall: string;
      value: number;
      paymentMethod: string;
      customer: { connect: { id: number } };
    };
    productData: [
      {
        productId: number;
        quantity: number;
      }
    ];
  }): Observable<Sell> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.post<Sell>(`${this.baseUrl}/sell/create`, body, {
      headers: header,
    });
  }
  getOneSellById(id: number): Observable<Sell> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Sell>(`${this.baseUrl}/sell/one?id=${id}`, {
      headers: header,
    });
  }

  updateSellInfo(data: {
    id: number;
    dateOfSell: string;
    dateToInstall: string;
    value: number;
    customerId: number;
    products?: { connect: { id: number } };
  }): Observable<Sell> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put<Sell>(`${this.baseUrl}/customer/update`, body, {
      headers: header,
    });
  }
}
