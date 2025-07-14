import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StrategyService } from '../../strategy.service';
import { Strategy } from '../../models/strategy.model';

@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Strategy>();
  errorMessage: string = '';
  totalAllocatedCapital: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private strategyService: StrategyService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadStrategies();
    this.loadTotalAllocatedCapital();
    this.dataSource.filterPredicate = (data: Strategy, filter: string) => {
      const searchString = `${data.name} ${data.parameters['description'] || ''}`.toLowerCase();
      return searchString.includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadStrategies(): void {
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

  loadTotalAllocatedCapital(): void {
    this.strategyService.getTotalAllocatedCapital().subscribe(
      capital => {
        this.totalAllocatedCapital = capital;
      },
      error => {
        console.error('Error fetching total allocated capital:', error);
      }
    );
  }

  squareOff(strategyId: string | undefined): void {
    if (strategyId === undefined) {
      this.snackBar.open('Cannot square off: Strategy ID is missing.', 'Close', { duration: 3000 });
      return;
    }
    if (confirm('Are you sure you want to square off all positions for this strategy?')) {
      this.strategyService.squareOffStrategy(parseInt(strategyId)).subscribe(
        () => {
          this.snackBar.open('Square off signal sent successfully!', 'Close', { duration: 3000 });
          this.loadStrategies(); // Refresh the list
        },
        error => {
          this.errorMessage = `Failed to square off strategy ${strategyId}.`;
          this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
          console.error('Error squaring off strategy:', error);
        }
      );
    }
  }

  deleteStrategy(strategyId: string | undefined): void {
    if (strategyId === undefined) {
      this.snackBar.open('Cannot delete: Strategy ID is missing.', 'Close', { duration: 3000 });
      return;
    }
    if (confirm('Are you sure you want to delete this strategy? This action cannot be undone.')) {
      this.strategyService.deleteStrategy(parseInt(strategyId)).subscribe(
        () => {
          this.snackBar.open('Strategy deleted successfully!', 'Close', { duration: 3000 });
          this.loadStrategies(); // Refresh the list
        },
        error => {
          this.errorMessage = `Failed to delete strategy ${strategyId}.`;
          this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
          console.error('Error deleting strategy:', error);
        }
      );
    }
  }
}