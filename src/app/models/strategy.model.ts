// --- Enums ---

export enum ProductType {
  MIS = 'MIS',
  NRML = 'NRML'
}

export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT'
}

export enum OptionType {
  CE = 'CE',
  PE = 'PE'
}

export enum Position {
  Buy = 'Buy',
  Sell = 'Sell'
}

export enum Index {
  NIFTY = 'NIFTY',
  BANKNIFTY = 'BANKNIFTY'
}

export enum TradeType {
  Intraday = 'Intraday',
  Positional = 'Positional'
}

export enum SizingMethod {
  FixedQuantity = 'Fixed Quantity',
  DynamicMargin = 'Dynamic Margin'
}

export enum HedgeMethod {
  Points = 'Points Away',
  PremiumPercentage = 'Premium Percentage'
}

export enum ExecutionMode {
  Auto = 'Auto',
  Manual = 'Manual'
}

export enum AmountOrPercent {
  Amount = 'Amount',
  Percentage = 'Percentage'
}

// --- Interfaces for API Models (matching C# StrategyConfig) ---

export interface ApiRiskParameters {
  maxOpenPositions: number;
  maxExposure: number;
  maxLoss: number;
  maxProfit: number;
}

export interface ApiStrategyConfig {
  id?: string; // API uses string GUID for ID
  name: string;
  isActive: boolean;
  allocatedCapital: number;
  strategyType: string; // e.g., "NiftyOptionStrategy"
  parameters: Record<string, string>; // Dictionary<string, string> in C#
  riskParameters: ApiRiskParameters;
}

// --- Interfaces for Angular UI Form (detailed settings) ---

export interface HedgeSettings {
  enabled: boolean;
  method: HedgeMethod;
  points: number; // For Points Away
  premiumPercentage: number; // For Premium Percentage
}

export interface RiskManagementSettings {
  overallStopLoss: number;
  overallStopLossType: AmountOrPercent;

  overallTarget: number;
  overallTargetType: AmountOrPercent;

  profitLock: boolean;
  profitLockThreshold: number;
  profitLockThresholdType: AmountOrPercent;
  profitLockRetracement: number; // After locking, how much can it go down before exit
  profitLockRetracementType: AmountOrPercent;

  trailingStopLoss: boolean;
  trailingStopLossType: AmountOrPercent;
  trailingStopLossStep: number; // For every X profit...
  trailingStopLossTrail: number; // ...trail by Y

  moveToCostOnProfit: boolean;
  moveToCostThreshold: number;
  moveToCostThresholdType: AmountOrPercent;

  exitAndReEnter: boolean;
  exitAndReEnterThreshold: number;
  exitAndReEnterThresholdType: AmountOrPercent;
}

// This interface represents the full set of data collected by the Angular forms
// It will be serialized into the 'parameters' dictionary of ApiStrategyConfig
export interface StrategyDetails {
  description?: string;
  index: Index;
  tradeType: TradeType;
  executionMode: ExecutionMode;
  activeFrom: string; // ISO Date string
  activeTo: string; // ISO Date string
  sizingMethod: SizingMethod;
  quantity: number; // For FixedQuantity
  allocatedMargin: number; // For DynamicMargin
  hedgeSettings: HedgeSettings;
  riskManagement: RiskManagementSettings;
  webhookUrl?: string;
}

// The main Strategy interface used in the Angular application,
// combining ApiStrategyConfig with the detailed form settings.
// This will be used for type-checking in components.
export interface Strategy extends ApiStrategyConfig {
  // The properties below are derived from or mapped to the 'parameters' dictionary
  // and 'riskParameters' object of ApiStrategyConfig.
  // They are included here for convenience in Angular components.
  description?: string;
  index: Index;
  tradeType: TradeType;
  executionMode: ExecutionMode;
  activeFrom: string;
  activeTo: string;
  sizingMethod: SizingMethod;
  quantity: number;
  allocatedMargin: number;
  hedgeSettings: HedgeSettings;
  riskManagement: RiskManagementSettings; // This will be mapped from ApiRiskParameters and other detailed risk settings
  webhookUrl?: string;
}