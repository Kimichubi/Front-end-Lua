import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Financial } from '../../interface/Financial';

@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000';

  getFinancial(page: number): Observable<Financial[]> {
    const token = sessionStorage.getItem('token-api');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Financial[]>(
      `${this.baseUrl}/financial?page=${page}`,
      {
        headers: headers,
      }
    );
  }
  getOneFinancial(id: number): Observable<Financial> {
    const token = sessionStorage.getItem('token-api');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Financial>(`${this.baseUrl}/financial/one?id=${id}`, {
      headers: headers,
    });
  }

  create(data: {
    name: string;
    value: number;
    dateToPay: string;
    isPaid: boolean;
    isFixed: boolean;
    date: string;
  }): Observable<Financial> {
    const token = sessionStorage.getItem('token-api');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.post<Financial>(`${this.baseUrl}/financial/create`, body, {
      headers: headers,
    });
  }

  updateFinancial(data: {
    id: number;
    name: string;
    value: number;
    dateToPay: string;
    isPaid: boolean;
    isFixed: boolean;
    date: string;
  }): Observable<Financial> {
    const token = sessionStorage.getItem('token-api');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put<Financial>(`${this.baseUrl}/financial/update`, body, {
      headers: headers,
    });
  }
}
