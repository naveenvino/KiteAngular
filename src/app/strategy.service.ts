import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for managing trading strategies via the API.
 */
@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  private apiUrl = 'https://localhost:56412/api/Strategy'; // Base URL for StrategyController

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a list of all active trading strategies.
   * @returns An Observable that emits an array of strategy objects.
   */
  getActiveStrategies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Adds a new trading strategy to the system.
   * @param strategy The strategy object to add.
   * @returns An Observable that emits the newly added strategy object.
   */
  addStrategy(strategy: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, strategy);
  }
}
