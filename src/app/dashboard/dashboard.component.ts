import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { PositionPnlDto } from '../models/portfolio.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  portfolioPnl: PositionPnlDto | null = null;
  errorMessage: string = '';

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadPnl();
  }

  loadPnl(): void {
    this.portfolioService.getPnl().subscribe(
      (data: PositionPnlDto) => {
        this.portfolioPnl = data;
      },
      (error: any) => {
        this.errorMessage = 'Failed to load portfolio PnL.';
        console.error('Error fetching PnL:', error);
      }
    );
  }
}
