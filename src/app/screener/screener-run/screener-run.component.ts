import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenerService } from '../../screener.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-screener-run',
  templateUrl: './screener-run.component.html',
  styleUrls: ['./screener-run.component.css']
})
export class ScreenerRunComponent implements OnInit {
  screenerId: string | null = null;
  screenerResults: any[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  displayedColumns: string[] = ['instrumentToken', 'tradingSymbol', 'exchange', 'instrumentType'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private screenerService: ScreenerService
  ) { }

  ngOnInit(): void {
    this.screenerId = this.route.snapshot.paramMap.get('id');
    if (this.screenerId) {
      this.runScreener();
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

  runScreener(): void {
    if (this.screenerId) {
      this.loading = true;
      this.errorMessage = '';
      this.screenerResults = [];

      this.screenerService.runScreener(this.screenerId).subscribe(
        data => {
          this.screenerResults = data;
          this.dataSource.data = data;
          this.loading = false;
        },
        error => {
          this.errorMessage = 'Failed to run screener.';
          this.loading = false;
          console.error('Error running screener:', error);
        }
      );
    }
  }
}
