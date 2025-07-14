import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StrategyService } from '../../strategy.service';
import {
  Strategy,
  Index,
  TradeType,
  ExecutionMode,
  SizingMethod,
  HedgeMethod,
  AmountOrPercent
} from '../../models/strategy.model';

@Component({
  selector: 'app-strategy-edit',
  templateUrl: './strategy-edit.component.html',
  styleUrls: ['./strategy-edit.component.css']
})
export class StrategyEditComponent implements OnInit {
  strategyForm!: FormGroup;
  strategyId!: string;

  // Enums for template access
  index = Object.values(Index);
  tradeType = Object.values(TradeType);
  executionMode = Object.values(ExecutionMode);
  sizingMethod = Object.values(SizingMethod);
  hedgeMethod = Object.values(HedgeMethod);
  amountOrPercent = Object.values(AmountOrPercent);

  constructor(
    private fb: FormBuilder,
    private strategyService: StrategyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.strategyId = this.route.snapshot.paramMap.get('id') as string;
    this.strategyForm = this.fb.group({
      id: [this.strategyId],
      name: ['', Validators.required],
      isActive: [true],
      allocatedCapital: [100000, [Validators.required, Validators.min(1)]],
      strategyType: ['NiftyOptionStrategy', Validators.required],
      description: [''],
      index: [Index.NIFTY, Validators.required],
      tradeType: [TradeType.Intraday, Validators.required],
      executionMode: [ExecutionMode.Auto, Validators.required],
      activeFrom: [new Date().toISOString().split('T')[0], Validators.required],
      activeTo: [new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], Validators.required],
      sizingMethod: [SizingMethod.FixedQuantity, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      allocatedMargin: [100000, [Validators.required, Validators.min(1)]],
      hedgeSettings: this.fb.group({
        enabled: [true],
        method: [HedgeMethod.Points, Validators.required],
        points: [300, Validators.min(0)],
        premiumPercentage: [30, Validators.min(0)]
      }),
      riskManagement: this.fb.group({
        overallStopLoss: [1000, Validators.required],
        overallStopLossType: [AmountOrPercent.Amount, Validators.required],
        overallTarget: [2000, Validators.required],
        overallTargetType: [AmountOrPercent.Amount, Validators.required],
        
        profitLock: [false],
        profitLockThreshold: [500],
        profitLockThresholdType: [AmountOrPercent.Amount],
        profitLockRetracement: [100],
        profitLockRetracementType: [AmountOrPercent.Amount],

        trailingStopLoss: [false],
        trailingStopLossType: [AmountOrPercent.Percentage],
        trailingStopLossStep: [10],
        trailingStopLossTrail: [5],

        moveToCostOnProfit: [false],
        moveToCostThreshold: [20],
        moveToCostThresholdType: [AmountOrPercent.Percentage],

        exitAndReEnter: [false],
        exitAndReEnterThreshold: [80],
        exitAndReEnterThresholdType: [AmountOrPercent.Percentage]
      }),
      riskParameters: this.fb.group({
        maxOpenPositions: [5, [Validators.required, Validators.min(1)]],
        maxExposure: [1000000, [Validators.required, Validators.min(0)]],
        maxLoss: [50000, [Validators.required, Validators.min(0)]],
        maxProfit: [100000, [Validators.required, Validators.min(0)]]
      })
    });
    this.loadStrategyData();
  }

  loadStrategyData(): void {
    this.strategyService.getStrategyById(parseInt(this.strategyId)).subscribe(
      data => {
        // Deserialize data from API's StrategyConfig format to form controls
        const formValue = this.strategyService.fromApiStrategyConfig(data);
        this.strategyForm.patchValue(formValue);
      },
      error => {
        this.snackBar.open('Error loading strategy data.', 'Close', { duration: 3000 });
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.strategyForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
      // Mark all fields as touched to display validation errors
      this.strategyForm.markAllAsTouched();
      return;
    }

    const updatedStrategy: Strategy = this.strategyForm.value;

    this.strategyService.updateStrategy(parseInt(this.strategyId), updatedStrategy).subscribe(
      () => {
        this.snackBar.open('Strategy updated successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/strategy/list']);
      },
      error => {
        this.snackBar.open('Failed to update strategy. See console for details.', 'Close', { duration: 5000 });
        console.error('Error updating strategy:', error);
      }
    );
  }
}
