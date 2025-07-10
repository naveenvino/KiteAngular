import { Component, OnInit, ViewChild } from '@angular/core';
import { StrategyService } from '../../strategy.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'instrument', 'quantity'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private strategyService: StrategyService) { }

  ngOnInit(): void {
    this.getActiveStrategies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getActiveStrategies(): void {
    this.strategyService.getActiveStrategies().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        this.errorMessage = 'Failed to load strategies.';
        console.error('Error fetching strategies:', error);
      }
    );
  }
}
