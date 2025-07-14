import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { Holding, TradePosition, PositionPnlDto } from '../models/portfolio.model';

@Component({
  selector: 'app-portfolio-dashboard',
  templateUrl: './portfolio-dashboard.component.html',
  styleUrls: ['./portfolio-dashboard.component.css']
})
export class PortfolioDashboardComponent implements OnInit {

  holdings: Holding[] = [];
  positions: TradePosition[] = [];
  pnl: PositionPnlDto | undefined;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getHoldings().subscribe(holdings => {
      this.holdings = holdings;
    });

    this.portfolioService.getPositions().subscribe(positions => {
      this.positions = positions;
    });

    this.portfolioService.getPnl().subscribe(pnl => {
      this.pnl = pnl;
    });
  }
}
