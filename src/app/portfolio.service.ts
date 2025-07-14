import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Holding, PositionPnlDto, TradePosition } from './models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'https://localhost:56412/Portfolio';

  constructor(private http: HttpClient) { }

  getHoldings(): Observable<Holding[]> {
    return this.http.get<Holding[]>(`${this.apiUrl}/holdings`);
  }

  getPositions(): Observable<TradePosition[]> {
    return this.http.get<TradePosition[]>(`${this.apiUrl}/positions`);
  }

  getPnl(): Observable<PositionPnlDto> {
    return this.http.get<PositionPnlDto>(`${this.apiUrl}/pnl`);
  }
}
