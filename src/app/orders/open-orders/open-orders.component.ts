import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css']
})
export class OpenOrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'tradingSymbol', 'quantity', 'price', 'status'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOpenOrders();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getOpenOrders(): void {
    this.ordersService.getOpenOrders().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        this.errorMessage = 'Failed to load open orders.';
        console.error('Error fetching open orders:', error);
      }
    );
  }
}
