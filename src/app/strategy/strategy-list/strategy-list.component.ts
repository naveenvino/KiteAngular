import { Component, OnInit } from '@angular/core';
import { StrategyService } from '../../strategy.service';

@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit {
  strategies: any[] = [];
  errorMessage: string = '';

  constructor(private strategyService: StrategyService) { }

  ngOnInit(): void {
    this.getActiveStrategies();
  }

  getActiveStrategies(): void {
    this.strategyService.getActiveStrategies().subscribe(
      data => {
        this.strategies = data;
      },
      error => {
        this.errorMessage = 'Failed to load strategies.';
        console.error('Error fetching strategies:', error);
      }
    );
  }
}
