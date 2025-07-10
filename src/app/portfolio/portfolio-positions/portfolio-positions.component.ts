import { Component, OnInit, ViewChild } from '@angular/core';
import { PortfolioService } from '../../portfolio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-portfolio-positions',
  templateUrl: './portfolio-positions.component.html',
  styleUrls: ['./portfolio-positions.component.css']
})
export class PortfolioPositionsComponent implements OnInit {
  displayedColumns: string[] = ['instrument', 'quantity', 'averagePrice', 'lastPrice', 'realizedPnl', 'unrealizedPnl'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getPositions();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPositions(): void {
    this.portfolioService.getPositions().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        this.errorMessage = 'Failed to load positions data.';
        console.error('Error fetching positions:', error);
      }
    );
  }
}
