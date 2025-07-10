import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for interacting with the backtesting functionalities of the API.
 */
@Injectable({
  providedIn: 'root'
})
export class BacktestingService {
  private apiUrl = 'https://localhost:56412/api/Backtesting'; // Base URL for BacktestingController

  constructor(private http: HttpClient) { }

  /**
   * Runs a backtest with the specified parameters.
   * @param symbol The trading symbol for the backtest (e.g., 'INFY').
   * @param fromDate The start date for the backtest in 'YYYY-MM-DD' format.
   * @param toDate The end date for the backtest in 'YYYY-MM-DD' format.
   * @param interval The time interval for the data (e.g., 'day', '3minute').
   * @returns An Observable that emits the backtest results.
   */
  runBacktest(symbol: string, fromDate: string, toDate: string, interval: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('symbol', symbol);
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    params = params.append('interval', interval);

    return this.http.post<any>(this.apiUrl, null, { params });
  }
}
