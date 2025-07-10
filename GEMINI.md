# Project Context for Gemini CLI

This document provides essential context for the Gemini CLI regarding the `KiteAngular` project and its associated API.

## Angular Project (`KiteAngular`)

*   **Location:** `C:/Users/E1791/KiteAngular/`
*   **Purpose:** Frontend UI for interacting with the KiteConnect API.
*   **Current State:**
    *   Authentication (Login, Logout) implemented.
    *   JWT Token handling via `AuthService` and `AuthInterceptor`.
    *   Route protection using `AuthGuard`.
    *   Portfolio Module (Holdings, Positions, PnL) implemented.
    *   API communication uses `https://localhost:56412`.

## API Project (`KiteConnectApi`)

*   **Local Location:** `C:/Users/E1791/Kite/`
*   **GitHub Repository:** `https://github.com/naveenvino/KiteConnectApi.git`
*   **Purpose:** Backend API providing trading and portfolio data.
*   **Expected Running Port:** `https://localhost:56412`
*   **Authentication:**
    *   Login Endpoint: `https://localhost:56412/api/v1/Auth/login`
    *   Hardcoded Credentials (for development):
        *   Username: `admin`
        *   Password: `password`
*   **Key Controllers (Endpoints):**
    *   `AuthController` (Authentication)
    *   `PortfolioController` (Holdings, Positions, PnL)
    *   `OrdersController` (Orders management)
    *   `QuotesController` (Market data)
    *   `StrategyController` (Trading strategies)
    *   `BacktestingController` (Backtesting functionalities)
    *   `ScreenerController` (Market screening)
    *   `NotificationController` (Notification preferences)

## How to Start the Projects:

1.  **Start the API:** Navigate to `C:/Users/E1791/Kite/` in your terminal and run `dotnet run`.
2.  **Start the Angular App:** Navigate to `C:/Users/E1791/KiteAngular/` in your terminal and run `ng serve`. If you encounter `ERR_OSSL_EVP_UNSUPPORTED` errors, use `set NODE_OPTIONS=--openssl-legacy-provider && ng serve`.
