import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'https://localhost:56412/Portfolio'; // Base URL for PortfolioController

  constructor(private http: HttpClient) { }

  getPortfolioPnl(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pnl`);
  }

  getHoldings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/holdings`);
  }

  getPositions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/positions`);
  }
}