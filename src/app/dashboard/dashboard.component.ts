import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  portfolioPnl: any;
  errorMessage: string = '';

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getPortfolioPnl();
  }

  getPortfolioPnl(): void {
    this.portfolioService.getPortfolioPnl().subscribe(
      data => {
        this.portfolioPnl = data;
      },
      error => {
        this.errorMessage = 'Failed to load portfolio data.';
        console.error('Error fetching portfolio PnL:', error);
      }
    );
  }
}