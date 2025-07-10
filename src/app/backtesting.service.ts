import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacktestingService {
  private apiUrl = 'https://localhost:56412/api/Backtesting'; // Base URL for BacktestingController

  constructor(private http: HttpClient) { }

  runBacktest(symbol: string, fromDate: string, toDate: string, interval: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('symbol', symbol);
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    params = params.append('interval', interval);

    return this.http.post<any>(this.apiUrl, null, { params });
  }
}
