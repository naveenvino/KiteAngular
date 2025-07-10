import { Component, OnInit, ViewChild } from '@angular/core';
import { ScreenerService } from '../../screener.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-screener-list',
  templateUrl: './screener-list.component.html',
  styleUrls: ['./screener-list.component.css']
})
export class ScreenerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private screenerService: ScreenerService) { }

  ngOnInit(): void {
    this.getAllScreenerCriterias();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllScreenerCriterias(): void {
    this.screenerService.getAllScreenerCriterias().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        this.errorMessage = 'Failed to load screener criterias.';
        console.error('Error fetching screener criterias:', error);
      }
    );
  }
}
