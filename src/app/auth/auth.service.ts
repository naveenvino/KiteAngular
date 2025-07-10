import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  iat: number;
  // Add other properties from your JWT payload if needed
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service for handling user authentication, including login, token management, and logout.
 */
export class AuthService {
  private apiUrl = 'https://localhost:56412/api/v1/Auth'; // Base URL for the authentication API

  public loginSuccess = new Subject<void>();
  public logoutSuccess = new Subject<void>();

  constructor(private http: HttpClient) { }

  /**
   * Sends a login request to the API with the provided username and password.
   * @param username The user's username.
   * @param password The user's password.
   * @returns An Observable that emits the API response, typically containing a JWT token on success.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  /**
   * Stores the provided JWT token in the browser's local storage.
   * @param token The JWT token to store.
   */
  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
    console.log('AuthService: Token set in localStorage:', token);
    this.loginSuccess.next(); // Emit login success event
  }

  /**
   * Retrieves the JWT token from the browser's local storage.
   * It also validates if the token is expired. If expired, it removes the token.
   * @returns The JWT token string, or null if not found or expired.
   */
  getToken(): string | null {
    const token = localStorage.getItem('jwt_token');
    console.log('AuthService: Token retrieved from localStorage:', token);

    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
          // Token is expired
          console.log('AuthService: Token expired. Removing from localStorage.');
          localStorage.removeItem('jwt_token');
          this.logoutSuccess.next(); // Emit logout success event due to expiry
          return null;
        }
      } catch (error) {
        // Error decoding token (e.g., malformed token)
        console.error('AuthService: Error decoding token:', error);
        localStorage.removeItem('jwt_token');
        this.logoutSuccess.next();
        return null;
      }
    }
    return token;
  }

  /**
   * Removes the JWT token from the browser's local storage, effectively logging out the user.
   */
  logout(): void {
    localStorage.removeItem('jwt_token');
    console.log('AuthService: Token removed from localStorage.');
    this.logoutSuccess.next(); // Emit logout success event
  }
}
