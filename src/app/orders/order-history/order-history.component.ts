import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any[] = [];
  errorMessage: string = '';

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory(): void {
    this.ordersService.getOrderHistory().subscribe(
      data => {
        this.orderHistory = data;
      },
      error => {
        this.errorMessage = 'Failed to load order history.';
        console.error('Error fetching order history:', error);
      }
    );
  }
}
