import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://localhost:56412/api/Orders'; // Base URL for OrdersController

  constructor(private http: HttpClient) { }

  getOpenOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOrderHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }
}
