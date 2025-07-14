import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SignalRService } from '../signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private authSubscription!: Subscription;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public authService: AuthService,
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    // Manage SignalR connection based on authentication state
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.signalRService.startConnection();
      } else {
        this.signalRService.stopConnection();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    // Ensure connection is stopped on component destruction
    this.signalRService.stopConnection();
  }

  logout(): void {
    this.authService.logout();
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
