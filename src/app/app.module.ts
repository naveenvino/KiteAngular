import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// --- Angular Material Modules ---
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';


// --- App Components ---
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
import { StrategyEditComponent } from './strategy/strategy-edit/strategy-edit.component';
import { BacktestComponent } from './backtesting/backtest/backtest.component';
import { ScreenerListComponent } from './screener/screener-list/screener-list.component';
import { ScreenerAddComponent } from './screener/screener-add/screener-add.component';
import { ScreenerRunComponent } from './screener/screener-run/screener-run.component';
import { NotificationPreferencesComponent } from './notifications/notification-preferences/notification-preferences.component';
import { NotificationAddComponent } from './notifications/notification-add/notification-add.component';
import { TradingActionsComponent } from './trading/trading-actions/trading-actions.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PortfolioDashboardComponent } from './portfolio-dashboard/portfolio-dashboard.component';
import { TradeAlertsComponent } from './trade-alerts/trade-alerts.component';

// --- Services & Interceptors ---
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
    StrategyEditComponent,
    BacktestComponent,
    ScreenerListComponent,
    ScreenerAddComponent,
    ScreenerRunComponent,
    NotificationPreferencesComponent,
    NotificationAddComponent,
    TradingActionsComponent,
    MainLayoutComponent,
    PortfolioDashboardComponent,
    TradeAlertsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDividerModule
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

