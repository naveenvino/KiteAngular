import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KiteAngular';

  constructor(public authService: AuthService, private router: Router) {
    console.log('AppComponent constructor. Initial isLoggedIn:', this.isLoggedIn());
  }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit. Current isLoggedIn:', this.isLoggedIn());
  }

  isLoggedIn(): boolean {
    const token = this.authService.getToken();
    console.log('isLoggedIn check. Token:', token);
    return !!token;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
