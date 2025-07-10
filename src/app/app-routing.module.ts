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
import { BacktestComponent } from './backtesting/backtest/backtest.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'holdings', component: PortfolioHoldingsComponent, canActivate: [AuthGuard] },
  { path: 'positions', component: PortfolioPositionsComponent, canActivate: [AuthGuard] },
  { path: 'open-orders', component: OpenOrdersComponent, canActivate: [AuthGuard] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] },
  { path: 'quotes', component: QuotesComponent, canActivate: [AuthGuard] },
  { path: 'strategies', component: StrategyListComponent, canActivate: [AuthGuard] },
  { path: 'add-strategy', component: StrategyAddComponent, canActivate: [AuthGuard] },
  { path: 'backtest', component: BacktestComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Add other routes here later
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
