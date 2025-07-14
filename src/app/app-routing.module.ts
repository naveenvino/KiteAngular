import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { PortfolioHoldingsComponent } from './portfolio/portfolio-holdings/portfolio-holdings.component';
import { PortfolioPositionsComponent } from './portfolio/portfolio-positions/portfolio-positions.component';
import { OpenOrdersComponent } from './orders/open-orders/open-orders.component';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';
import { QuotesComponent } from './market-data/quotes/quotes.component';
import { StrategyListComponent } from './strategy/strategy-list/strategy-list.component';
import { StrategyAddComponent } from './strategy/strategy-add/strategy-add.component';
import { StrategyEditComponent } from './strategy/strategy-edit/strategy-edit.component';
import { BacktestComponent } from './backtesting/backtest/backtest.component';
import { ScreenerListComponent } from './screener/screener-list/screener-list.component';
import { ScreenerAddComponent } from './screener/screener-add/screener-add.component';
import { ScreenerRunComponent } from './screener/screener-run/screener-run.component';
import { NotificationPreferencesComponent } from './notifications/notification-preferences/notification-preferences.component';
import { NotificationAddComponent } from './notifications/notification-add/notification-add.component';
import { TradingActionsComponent } from './trading/trading-actions/trading-actions.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TradeAlertsComponent } from './trade-alerts/trade-alerts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', // This is the authenticated area
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'holdings', component: PortfolioHoldingsComponent },
      { path: 'positions', component: PortfolioPositionsComponent },
      { path: 'open-orders', component: OpenOrdersComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'quotes', component: QuotesComponent },
      { path: 'strategy/list', component: StrategyListComponent },
      { path: 'strategy/add', component: StrategyAddComponent },
      { path: 'strategy/edit/:id', component: StrategyEditComponent },
      { path: 'backtest', component: BacktestComponent },
      { path: 'screeners', component: ScreenerListComponent },
      { path: 'add-screener', component: ScreenerAddComponent },
      { path: 'run-screener/:id', component: ScreenerRunComponent },
      { path: 'notification-preferences', component: NotificationPreferencesComponent },
      { path: 'add-notification-preference', component: NotificationAddComponent },
      { path: 'trading-actions', component: TradingActionsComponent },
      { path: 'trade-alerts', component: TradeAlertsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default authenticated route
    ]
  },
  
  { path: '**', redirectTo: 'login' } // Redirect any unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
