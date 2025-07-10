import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for managing notification preferences via the API.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'https://localhost:56412/api/Notification'; // Base URL for NotificationController

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all notification preferences.
   * @returns An Observable that emits an array of notification preference objects.
   */
  getAllNotificationPreferences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Adds a new notification preference.
   * @param preference The notification preference object to add.
   * @returns An Observable that emits the newly added notification preference object.
   */
  addNotificationPreference(preference: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, preference);
  }

  /**
   * Updates an existing notification preference.
   * @param id The ID of the notification preference to update.
   * @param preference The updated notification preference object.
   * @returns An Observable that emits the updated notification preference object.
   */
  updateNotificationPreference(id: string, preference: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, preference);
  }

  /**
   * Deletes a notification preference by its ID.
   * @param id The ID of the notification preference to delete.
   * @returns An Observable that emits a confirmation of the deletion.
   */
  deleteNotificationPreference(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
