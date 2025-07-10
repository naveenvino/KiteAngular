import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  private apiUrl = 'https://localhost:56412/api/Strategy'; // Base URL for StrategyController

  constructor(private http: HttpClient) { }

  getActiveStrategies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addStrategy(strategy: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, strategy);
  }
}
