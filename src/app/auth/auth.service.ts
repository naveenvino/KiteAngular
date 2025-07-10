import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:56412/api/v1/Auth'; // Assuming your API runs on localhost:5000

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
    console.log('AuthService: Token set in localStorage:', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwt_token');
    console.log('AuthService: Token retrieved from localStorage:', token);
    return token;
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    console.log('AuthService: Token removed from localStorage.');
  }
}
