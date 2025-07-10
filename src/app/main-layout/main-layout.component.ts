import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { SignalRService } from '../signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  title = 'KiteAngular';
  private authSubscription!: Subscription;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public authService: AuthService, private router: Router, private signalRService: SignalRService) { }

  ngOnInit(): void {
    // Start SignalR connection if already logged in (e.g., on page refresh)
    if (this.authService.getToken()) {
      this.signalRService.startConnection();
    }

    // Subscribe to login/logout events to manage SignalR connection
    this.authSubscription = this.authService.logoutSuccess.subscribe(() => {
      this.signalRService.stopConnection();
      this.router.navigate(['/login']); // Ensure redirection on logout
    });
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    // The logoutSuccess subscription in ngOnInit will handle navigation
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
