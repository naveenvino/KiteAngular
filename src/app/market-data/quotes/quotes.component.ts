import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MarketDataService } from '../../market-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SignalRService } from '../../signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['instrument', 'lastPrice', 'change', 'changePercentage', 'volume'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';
  Object: any = Object;
  instrumentsToFetch: string[] = ['INFY', 'RELIANCE', 'TCS'];
  private marketDataSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private marketDataService: MarketDataService, private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.getLiveQuotes();
    this.marketDataSubscription = this.signalRService.getMarketDataObservable().subscribe(data => {
      // Assuming 'data' contains updates for multiple instruments
      // You might need to adjust this logic based on the actual SignalR message format
      if (data && data.instrumentToken) {
        const currentData = this.dataSource.data;
        const index = currentData.findIndex(item => item.instrumentToken === data.instrumentToken);
        if (index > -1) {
          currentData[index] = { ...currentData[index], ...data }; // Update existing
        } else {
          currentData.push(data); // Add new if not present
        }
        this.dataSource.data = [...currentData]; // Trigger change detection for MatTable
      }
    });
  }

  ngOnDestroy(): void {
    if (this.marketDataSubscription) {
      this.marketDataSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLiveQuotes(): void {
    this.marketDataService.getQuotes(this.instrumentsToFetch).subscribe(
      data => {
        const quotesArray = this.instrumentsToFetch.map(inst => ({
          instrumentToken: inst,
          ...data[inst]
        }));
        this.dataSource.data = quotesArray;
      },
      error => {
        this.errorMessage = 'Failed to load live quotes.';
        console.error('Error fetching quotes:', error);
      }
    );
  }
}