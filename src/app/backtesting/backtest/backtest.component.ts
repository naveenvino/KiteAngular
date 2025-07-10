import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BacktestingService } from '../../backtesting.service';

@Component({
  selector: 'app-backtest',
  templateUrl: './backtest.component.html',
  styleUrls: ['./backtest.component.css']
})
export class BacktestComponent implements OnInit {
  backtestForm!: FormGroup;
  backtestResult: any;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private backtestingService: BacktestingService
  ) { }

  ngOnInit(): void {
    this.backtestForm = this.fb.group({
      symbol: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      interval: ['day', Validators.required] // Default to 'day'
    });
  }

  onSubmit(): void {
    if (this.backtestForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.backtestResult = null;

      const { symbol, fromDate, toDate, interval } = this.backtestForm.value;

      this.backtestingService.runBacktest(symbol, fromDate, toDate, interval).subscribe(
        result => {
          this.backtestResult = result;
          this.loading = false;
        },
        error => {
          this.errorMessage = 'Failed to run backtest.';
          this.loading = false;
          console.error('Error running backtest:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
