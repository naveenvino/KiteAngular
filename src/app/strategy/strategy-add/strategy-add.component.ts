import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StrategyService } from '../../strategy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-strategy-add',
  templateUrl: './strategy-add.component.html',
  styleUrls: ['./strategy-add.component.css']
})
export class StrategyAddComponent implements OnInit {
  strategyForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private strategyService: StrategyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.strategyForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      status: ['Active', Validators.required],
      instrumentToken: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.strategyForm.valid) {
      this.strategyService.addStrategy(this.strategyForm.value).subscribe(
        response => {
          this.successMessage = 'Strategy added successfully!';
          this.errorMessage = '';
          this.strategyForm.reset();
          this.router.navigate(['/strategies']); // Navigate to strategy list
        },
        error => {
          this.errorMessage = 'Failed to add strategy.';
          this.successMessage = '';
          console.error('Error adding strategy:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
