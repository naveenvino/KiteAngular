import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioHoldingsComponent } from './portfolio/portfolio-holdings/portfolio-holdings.component';
import { PortfolioPositionsComponent } from './portfolio/portfolio-positions/portfolio-positions.component';
import { OpenOrdersComponent } from './orders/open-orders/open-orders.component';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';
import { QuotesComponent } from './market-data/quotes/quotes.component';
import { StrategyListComponent } from './strategy/strategy-list/strategy-list.component';
import { StrategyAddComponent } from './strategy/strategy-add/strategy-add.component';
import { BacktestComponent } from './backtesting/backtest/backtest.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PortfolioHoldingsComponent,
    PortfolioPositionsComponent,
    OpenOrdersComponent,
    OrderHistoryComponent,
    QuotesComponent,
    StrategyListComponent,
    StrategyAddComponent,
    BacktestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
