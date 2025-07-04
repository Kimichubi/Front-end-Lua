import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interface/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  getAllCategorys(page: number): Observable<Category[]> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(`${this.baseUrl}/category?page=${page}`, {
      headers: header,
    });
  }

  getOneCategoryById(id: number, page: number): Observable<Category> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category>(
      `${this.baseUrl}/category/one?id=${id}&page=${page}`,
      {
        headers: header,
      }
    );
  }
  createCategory(name: string, description: string): Observable<Category> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify({ name, description });

    return this.http.post<Category>(`${this.baseUrl}/category/create`, body, {
      headers: header,
    });
  }
  deleteCategory(id: number): Observable<Category> {
    const token = sessionStorage.getItem('token-api');
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    const body = JSON.stringify({ id });

    return this.http.delete<Category>(`${this.baseUrl}/category/delete`, {
      headers: header,
      body,
    });
  }
}
