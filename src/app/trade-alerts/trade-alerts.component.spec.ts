import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAlertsComponent } from './trade-alerts.component';

describe('TradeAlertsComponent', () => {
  let component: TradeAlertsComponent;
  let fixture: ComponentFixture<TradeAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
