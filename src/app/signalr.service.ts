import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private marketDataSubject = new Subject<any>();

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  public startConnection(): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error("SignalR: No token found, connection aborted.");
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:56412/marketdatahub`, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('ReceiveMarketData', (data) => {
      this.marketDataSubject.next(data);
    });
    
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connection started!');
        this.snackBar.open('Live connection established.', 'Close', { duration: 2000 });
      })
      .catch(err => {
        console.error('Error while starting SignalR connection: ' + err);
        this.snackBar.open('Could not establish live connection.', 'Close', { duration: 3000 });
      });

    this.hubConnection.onclose((error) => {
        console.error(`SignalR connection closed: ${error}`);
        this.snackBar.open('Live connection lost.', 'Close', { duration: 3000 });
    });
  }

  public stopConnection(): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop().then(() => console.log('SignalR Connection stopped.'));
    }
  }

  public getMarketDataObservable(): Observable<any> {
    return this.marketDataSubject.asObservable();
  }

  public sendData(methodName: string, data: any): Promise<void> {
    return this.hubConnection.invoke(methodName, data)
      .catch(err => console.error('Error invoking method: ' + err));
  }
}
