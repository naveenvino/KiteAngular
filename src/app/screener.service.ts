import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for managing screener criteria and running screeners via the API.
 */
@Injectable({
  providedIn: 'root'
})
export class ScreenerService {
  private apiUrl = 'https://localhost:56412/api/Screener'; // Base URL for ScreenerController

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all saved screener criteria.
   * @returns An Observable that emits an array of screener criteria objects.
   */
  getAllScreenerCriterias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Adds new screener criteria.
   * @param criteria The screener criteria object to add.
   * @returns An Observable that emits the newly added screener criteria object.
   */
  addScreenerCriteria(criteria: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, criteria);
  }

  /**
   * Runs a screener with the specified ID.
   * @param id The ID of the screener criteria to run.
   * @returns An Observable that emits an array of instruments matching the criteria.
   */
  runScreener(id: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/run/${id}`, {});
  }
}
