import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private marketDataSubject = new Subject<any>();

  constructor(private authService: AuthService) { }

  public startConnection(): Promise<void> {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Cannot start SignalR connection: No JWT token found.');
      return Promise.reject('No JWT token.');
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:56412/marketdatahub', {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('ReceiveMarketData', (data) => {
      this.marketDataSubject.next(data);
    });

    return this.hubConnection.start()
      .then(() => console.log('SignalR Connection started!'))
      .catch(err => {
        console.error('Error while starting SignalR connection: ' + err);
        return Promise.reject(err);
      });
  }

  public stopConnection(): Promise<void> {
    return this.hubConnection.stop()
      .then(() => console.log('SignalR Connection stopped.'))
      .catch(err => console.error('Error while stopping SignalR connection: ' + err));
  }

  public getMarketDataObservable(): Observable<any> {
    return this.marketDataSubject.asObservable();
  }

  // Example of sending data to the hub (if needed)
  public sendData(methodName: string, data: any): Promise<void> {
    return this.hubConnection.invoke(methodName, data)
      .catch(err => console.error('Error invoking method: ' + err));
  }
}
