import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  private apiUrl = 'https://localhost:56412/api/Quotes'; // Base URL for QuotesController

  constructor(private http: HttpClient) { }

  getQuotes(instruments: string[]): Observable<any> {
    const instrumentParams = instruments.map(inst => `instruments=${inst}`).join('&');
    return this.http.get(`${this.apiUrl}?${instrumentParams}`);
  }
}
