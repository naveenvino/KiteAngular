import { Component, OnInit, ViewChild } from '@angular/core';
import { PortfolioService } from '../../portfolio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-portfolio-holdings',
  templateUrl: './portfolio-holdings.component.html',
  styleUrls: ['./portfolio-holdings.component.css']
})
export class PortfolioHoldingsComponent implements OnInit {
  displayedColumns: string[] = ['instrument', 'quantity', 'averagePrice', 'lastPrice', 'pnl'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getHoldings();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getHoldings(): void {
    this.portfolioService.getHoldings().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        this.errorMessage = 'Failed to load holdings data.';
        console.error('Error fetching holdings:', error);
      }
    );
  }
}
