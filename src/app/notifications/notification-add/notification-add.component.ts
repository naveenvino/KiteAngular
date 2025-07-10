import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-add',
  templateUrl: './notification-add.component.html',
  styleUrls: ['./notification-add.component.css']
})
export class NotificationAddComponent implements OnInit {
  notificationForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.notificationForm = this.fb.group({
      id: ['', Validators.required],
      type: ['Email', Validators.required], // Default to Email
      enabled: [true],
      // Add more fields as per your API's NotificationPreference model
      // e.g., emailAddress: ['', Validators.email],
      // phoneNumber: [''],
      // telegramChatId: ['']
    });
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      this.notificationService.addNotificationPreference(this.notificationForm.value).subscribe(
        response => {
          this.successMessage = 'Notification preference added successfully!';
          this.errorMessage = '';
          this.notificationForm.reset();
          this.router.navigate(['/notification-preferences']); // Navigate to list
        },
        error => {
          this.errorMessage = 'Failed to add notification preference.';
          this.successMessage = '';
          console.error('Error adding preference:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
