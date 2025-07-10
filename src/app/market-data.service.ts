import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for fetching market data, such as live quotes, from the API.
 */
@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  private apiUrl = 'https://localhost:56412/api/Quotes'; // Base URL for QuotesController

  constructor(private http: HttpClient) { }

  /**
   * Retrieves live quotes for a given array of instrument symbols.
   * @param instruments An array of instrument symbols (e.g., ['NSE:INFY', 'NSE:RELIANCE']).
   * @returns An Observable that emits an object containing quote data for the requested instruments.
   */
  getQuotes(instruments: string[]): Observable<any> {
    const instrumentParams = instruments.map(inst => `instruments=${inst}`).join('&');
    return this.http.get(`${this.apiUrl}?${instrumentParams}`);
  }
}
