import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-notification-preferences',
  templateUrl: './notification-preferences.component.html',
  styleUrls: ['./notification-preferences.component.css']
})
export class NotificationPreferencesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'enabled', 'actions'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllNotificationPreferences();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllNotificationPreferences(): void {
    this.notificationService.getAllNotificationPreferences().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        this.errorMessage = 'Failed to load notification preferences.';
        console.error('Error fetching preferences:', error);
      }
    );
  }

  deletePreference(id: string): void {
    if (confirm('Are you sure you want to delete this preference?')) {
      this.notificationService.deleteNotificationPreference(id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
        },
        error => {
          this.errorMessage = 'Failed to delete preference.';
          console.error('Error deleting preference:', error);
        }
      );
    }
  }
}
