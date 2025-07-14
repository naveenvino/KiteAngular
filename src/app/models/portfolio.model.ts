export interface Holding {
  instrument_token: number;
  tradingsymbol: string;
  exchange: string;
  quantity: number;
  average_price: number;
  last_price: number;
  close_price: number;
  pnl: number;
}

export interface TradePosition {
  tradingsymbol: string;
  exchange: string;
  instrument_token: number;
  product: string;
  quantity: number;
  average_price: number;
  last_price: number;
  realised: number;
  unrealised: number;
  pnl: number;
}

export interface PositionPnlDto {
  totalRealizedPnl: number;
  totalUnrealizedPnl: number;
  overallPnl: number;
}
