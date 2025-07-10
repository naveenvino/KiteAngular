import { Component, OnInit } from '@angular/core';
import { TradingService } from '../../trading.service';

@Component({
  selector: 'app-trading-actions',
  templateUrl: './trading-actions.component.html',
  styleUrls: ['./trading-actions.component.css']
})
export class TradingActionsComponent implements OnInit {
  message: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private tradingService: TradingService) { }

  ngOnInit(): void {
  }

  exitAllPositions(): void {
    if (confirm('Are you sure you want to exit all positions?')) {
      this.loading = true;
      this.message = '';
      this.errorMessage = '';

      this.tradingService.exitAllPositions().subscribe(
        response => {
          this.message = response.Status || 'Successfully sent exit all positions command.';
          this.loading = false;
        },
        error => {
          this.errorMessage = 'Failed to send exit all positions command.';
          this.loading = false;
          console.error('Error exiting positions:', error);
        }
      );
    }
  }
}
