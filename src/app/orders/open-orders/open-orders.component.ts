import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css']
})
export class OpenOrdersComponent implements OnInit {
  openOrders: any[] = [];
  errorMessage: string = '';

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOpenOrders();
  }

  getOpenOrders(): void {
    this.ordersService.getOpenOrders().subscribe(
      data => {
        this.openOrders = data;
      },
      error => {
        this.errorMessage = 'Failed to load open orders.';
        console.error('Error fetching open orders:', error);
      }
    );
  }
}
