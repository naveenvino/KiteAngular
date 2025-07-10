import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']); // Navigate to a dashboard or home page after successful login
      },
      error => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login error:', error);
      }
    );
  }
}