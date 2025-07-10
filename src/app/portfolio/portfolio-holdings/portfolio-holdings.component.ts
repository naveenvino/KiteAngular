import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/portfolio.service';


@Component({
  selector: 'app-portfolio-holdings',
  templateUrl: './portfolio-holdings.component.html',
  styleUrls: ['./portfolio-holdings.component.css']
})
export class PortfolioHoldingsComponent implements OnInit {
  holdings: any[] = [];
  errorMessage: string = '';

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getHoldings();
  }

  getHoldings(): void {
    this.portfolioService.getHoldings().subscribe(
      data => {
        this.holdings = data;
      },
      error => {
        this.errorMessage = 'Failed to load holdings data.';
        console.error('Error fetching holdings:', error);
      }
    );
  }
}
