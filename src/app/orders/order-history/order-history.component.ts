import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'tradingSymbol', 'quantity', 'price', 'status', 'orderType', 'transactionType', 'orderTimestamp'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getOrderHistory(): void {
    this.ordersService.getOrderHistory().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        this.errorMessage = 'Failed to load order history.';
        console.error('Error fetching order history:', error);
      }
    );
  }
}
