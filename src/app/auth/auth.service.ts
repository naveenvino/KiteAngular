import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

interface DecodedToken {
  exp: number;
  // Add other claims as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:56412/api/v1/Auth';
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasValidToken());

  constructor(private http: HttpClient, private router: Router) { }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      return false;
    }
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const isExpired = decodedToken.exp < (Date.now() / 1000);
      if (isExpired) {
        localStorage.removeItem('jwt_token');
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem('jwt_token');
      return false;
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // --- START DEBUGGING LOGS ---
        console.log('AuthService: Received response from login API:', response);
        if (response && response.token) {
          console.log('AuthService: Token found in response. Setting token and auth state.');
          localStorage.setItem('jwt_token', response.token);
          this.isAuthenticated.next(true);
        } else {
          console.error('AuthService: CRITICAL - "token" property not found in login response.', response);
        }
        // --- END DEBUGGING LOGS ---
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
}
