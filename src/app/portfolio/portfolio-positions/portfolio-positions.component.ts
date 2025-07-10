import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../portfolio.service';

@Component({
  selector: 'app-portfolio-positions',
  templateUrl: './portfolio-positions.component.html',
  styleUrls: ['./portfolio-positions.component.css']
})
export class PortfolioPositionsComponent implements OnInit {
  positions: any[] = [];
  errorMessage: string = '';

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getPositions();
  }

  getPositions(): void {
    this.portfolioService.getPositions().subscribe(
      data => {
        this.positions = data;
      },
      error => {
        this.errorMessage = 'Failed to load positions data.';
        console.error('Error fetching positions:', error);
      }
    );
  }
}
