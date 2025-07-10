import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradingService {
  private apiUrl = 'https://localhost:56412/api/Trading'; // Base URL for TradingController

  constructor(private http: HttpClient) { }

  /**
   * Sends a request to the API to exit all open positions.
   * @returns An Observable that emits the API response for the exit action.
   */
  exitAllPositions(): Observable<any> {
    return this.http.post(`${this.apiUrl}/exit-all`, {});
  }
}
