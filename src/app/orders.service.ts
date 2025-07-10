import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for fetching order-related data from the API.
 */
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://localhost:56412/api/Orders'; // Base URL for OrdersController

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a list of open orders.
   * @returns An Observable that emits an array of open order objects.
   */
  getOpenOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  /**
   * Retrieves the historical order data.
   * @returns An Observable that emits an array of historical order objects.
   */
  getOrderHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }
}
