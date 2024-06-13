import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createUser(email: string, name: string, password: string): Observable<User> {
    const userData = { email, name, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(userData);
    return this.http.post<User>(`${this.baseUrl}/user/create`, body, {
      headers,
    });
  }

  login(email: string, password: string): Observable<User> {
    const userData = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(userData);
    console.log(body);
    return this.http.post<User>(`${this.baseUrl}/auth/login`, body, {
      headers: headers,
    });
  }
}
