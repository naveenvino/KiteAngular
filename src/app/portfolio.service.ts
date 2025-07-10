import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for fetching portfolio-related data from the API.
 */
export class PortfolioService {
  private apiUrl = 'https://localhost:56412/Portfolio'; // Base URL for PortfolioController

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the overall Profit and Loss (PnL) for the portfolio.
   * @returns An Observable that emits the portfolio PnL data.
   */
  getPortfolioPnl(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pnl`);
  }

  /**
   * Retrieves the current holdings in the portfolio.
   * @returns An Observable that emits an array of holding objects.
   */
  getHoldings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/holdings`);
  }

  /**
   * Retrieves the current positions (open and closed) in the portfolio.
   * @returns An Observable that emits an array of position objects.
   */
  getPositions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/positions`);
  }
}