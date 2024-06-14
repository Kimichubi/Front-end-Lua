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
    return this.http.get<Financial[]>(`${this.baseUrl}/financial?page=${page}`, {
      headers: headers,
    });
  }
}
