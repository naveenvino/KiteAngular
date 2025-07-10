import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreenerService } from '../../screener.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screener-add',
  templateUrl: './screener-add.component.html',
  styleUrls: ['./screener-add.component.css']
})
export class ScreenerAddComponent implements OnInit {
  screenerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private screenerService: ScreenerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.screenerForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      // Add more fields for screener criteria as per your API's ScreenerCriteria model
      // For example:
      // minPrice: [0],
      // maxPrice: [0],
      // volumeGreaterThan: [0]
    });
  }

  onSubmit(): void {
    if (this.screenerForm.valid) {
      this.screenerService.addScreenerCriteria(this.screenerForm.value).subscribe(
        response => {
          this.successMessage = 'Screener criteria added successfully!';
          this.errorMessage = '';
          this.screenerForm.reset();
          this.router.navigate(['/screeners']); // Navigate to screener list
        },
        error => {
          this.errorMessage = 'Failed to add screener criteria.';
          this.successMessage = '';
          console.error('Error adding screener criteria:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
