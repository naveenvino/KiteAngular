import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../../market-data.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: any = {};
  errorMessage: string = '';
  // Make Object available in the template
  Object: any = Object;
  // Example instruments - replace with actual instrument tokens or symbols from your API
  // You might need to fetch a list of instruments first or allow user input
  instrumentsToFetch: string[] = ['INFY', 'RELIANCE', 'TCS']; 

  constructor(private marketDataService: MarketDataService) { }

  ngOnInit(): void {
    this.getLiveQuotes();
  }

  getLiveQuotes(): void {
    this.marketDataService.getQuotes(this.instrumentsToFetch).subscribe(
      data => {
        this.quotes = data;
      },
      error => {
        this.errorMessage = 'Failed to load live quotes.';
        console.error('Error fetching quotes:', error);
      }
    );
  }
}
