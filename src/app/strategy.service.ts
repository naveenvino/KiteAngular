import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Strategy, ApiStrategyConfig, ApiRiskParameters, Index, TradeType, ExecutionMode, SizingMethod, HedgeMethod, AmountOrPercent } from './models/strategy.model';

/**
 * Service for managing trading strategies via the API.
 */
@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  private apiUrl = 'https://localhost:56412/api/v1/Strategies'; // Corrected endpoint

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a list of all trading strategies.
   * @returns An Observable that emits an array of strategy objects.
   */
  getActiveStrategies(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(this.apiUrl);
  }

  /**
   * Adds a new trading strategy to the system.
   * @param strategy The strategy object to add.
   * @returns An Observable that emits the newly added strategy object.
   */
  addStrategy(strategy: Strategy): Observable<Strategy> {
    return this.http.post<Strategy>(this.apiUrl, strategy);
  }

  /**
   * Retrieves a single strategy by its ID.
   * @param id The ID of the strategy to retrieve.
   * @returns An Observable that emits the requested strategy object.
   */
  getStrategyById(id: number): Observable<Strategy> {
    return this.http.get<Strategy>(`${this.apiUrl}/${id}`);
  }

  /**
   * Updates an existing trading strategy.
   * @param id The ID of the strategy to update.
   * @param strategy The updated strategy object.
   * @returns An Observable that completes when the request is successful.
   */
  updateStrategy(id: number, strategy: Strategy): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, strategy);
  }

  /**
   * Sends a command to square off all positions for a specific strategy.
   * @param strategyId The ID of the strategy to square off.
   * @returns An Observable that completes when the request is successful.
   */
  squareOffStrategy(strategyId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${strategyId}/square-off-all`, {});
  }

  /**
   * Deletes a strategy by its ID.
   * @param id The ID of the strategy to delete.
   * @returns An Observable that completes when the request is successful.
   */
  deleteStrategy(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Retrieves the total allocated capital.
   * @returns An Observable that emits the total allocated capital as a number.
   */
  getTotalAllocatedCapital(): Observable<number> {
    return this.http.get<number>('https://localhost:56412/api/Strategy/total-allocated-capital');
  }

  private toApiStrategyConfig(strategy: Strategy): ApiStrategyConfig {
    const parameters: Record<string, string> = {};
    // Serialize detailed strategy settings into parameters dictionary
    parameters['description'] = strategy.description || '';
    parameters['index'] = strategy.index;
    parameters['tradeType'] = strategy.tradeType;
    parameters['executionMode'] = strategy.executionMode;
    parameters['activeFrom'] = strategy.activeFrom;
    parameters['activeTo'] = strategy.activeTo;
    parameters['sizingMethod'] = strategy.sizingMethod;
    parameters['quantity'] = strategy.quantity.toString();
    parameters['allocatedMargin'] = strategy.allocatedMargin.toString();

    // Hedge Settings
    parameters['hedgeSettings.enabled'] = strategy.hedgeSettings.enabled.toString();
    parameters['hedgeSettings.method'] = strategy.hedgeSettings.method;
    parameters['hedgeSettings.points'] = strategy.hedgeSettings.points.toString();
    parameters['hedgeSettings.premiumPercentage'] = strategy.hedgeSettings.premiumPercentage.toString();

    // Risk Management Settings
    parameters['riskManagement.overallStopLoss'] = strategy.riskManagement.overallStopLoss.toString();
    parameters['riskManagement.overallStopLossType'] = strategy.riskManagement.overallStopLossType;
    parameters['riskManagement.overallTarget'] = strategy.riskManagement.overallTarget.toString();
    parameters['riskManagement.overallTargetType'] = strategy.riskManagement.overallTargetType;
    parameters['riskManagement.profitLock'] = strategy.riskManagement.profitLock.toString();
    parameters['riskManagement.profitLockThreshold'] = strategy.riskManagement.profitLockThreshold.toString();
    parameters['riskManagement.profitLockThresholdType'] = strategy.riskManagement.profitLockThresholdType;
    parameters['riskManagement.profitLockRetracement'] = strategy.riskManagement.profitLockRetracement.toString();
    parameters['riskManagement.profitLockRetracementType'] = strategy.riskManagement.profitLockRetracementType;
    parameters['riskManagement.trailingStopLoss'] = strategy.riskManagement.trailingStopLoss.toString();
    parameters['riskManagement.trailingStopLossType'] = strategy.riskManagement.trailingStopLossType;
    parameters['riskManagement.trailingStopLossStep'] = strategy.riskManagement.trailingStopLossStep.toString();
    parameters['riskManagement.trailingStopLossTrail'] = strategy.riskManagement.trailingStopLossTrail.toString();
    parameters['riskManagement.moveToCostOnProfit'] = strategy.riskManagement.moveToCostOnProfit.toString();
    parameters['riskManagement.moveToCostThreshold'] = strategy.riskManagement.moveToCostThreshold.toString();
    parameters['riskManagement.moveToCostThresholdType'] = strategy.riskManagement.moveToCostThresholdType;
    parameters['riskManagement.exitAndReEnter'] = strategy.riskManagement.exitAndReEnter.toString();
    parameters['riskManagement.exitAndReEnterThreshold'] = strategy.riskManagement.exitAndReEnterThreshold.toString();
    parameters['riskManagement.exitAndReEnterThresholdType'] = strategy.riskManagement.exitAndReEnterThresholdType;
    parameters['webhookUrl'] = strategy.webhookUrl || '';

    const apiRiskParameters: ApiRiskParameters = {
      maxOpenPositions: strategy.riskParameters.maxOpenPositions || 0,
      maxExposure: strategy.riskParameters.maxExposure || 0,
      maxLoss: strategy.riskParameters.maxLoss || 0,
      maxProfit: strategy.riskParameters.maxProfit || 0,
    };

    return {
      id: strategy.id,
      name: strategy.name,
      isActive: strategy.isActive || true, // Assuming default to true if not provided
      allocatedCapital: strategy.allocatedCapital,
      strategyType: strategy.strategyType,
      parameters: parameters,
      riskParameters: apiRiskParameters
    };
  }

  public fromApiStrategyConfig(apiStrategyConfig: ApiStrategyConfig): Strategy {
    const strategy: Strategy = {
      id: apiStrategyConfig.id,
      name: apiStrategyConfig.name,
      isActive: apiStrategyConfig.isActive,
      allocatedCapital: apiStrategyConfig.allocatedCapital,
      strategyType: apiStrategyConfig.strategyType,
      parameters: apiStrategyConfig.parameters,
      riskParameters: apiStrategyConfig.riskParameters,

      // Deserialize detailed strategy settings from parameters dictionary
      description: apiStrategyConfig.parameters['description'],
      index: apiStrategyConfig.parameters['index'] as Index,
      tradeType: apiStrategyConfig.parameters['tradeType'] as TradeType,
      executionMode: apiStrategyConfig.parameters['executionMode'] as ExecutionMode,
      activeFrom: apiStrategyConfig.parameters['activeFrom'],
      activeTo: apiStrategyConfig.parameters['activeTo'],
      sizingMethod: apiStrategyConfig.parameters['sizingMethod'] as SizingMethod,
      quantity: parseFloat(apiStrategyConfig.parameters['quantity']),
      allocatedMargin: parseFloat(apiStrategyConfig.parameters['allocatedMargin']),

      // Hedge Settings
      hedgeSettings: {
        enabled: apiStrategyConfig.parameters['hedgeSettings.enabled'] === 'true',
        method: apiStrategyConfig.parameters['hedgeSettings.method'] as HedgeMethod,
        points: parseFloat(apiStrategyConfig.parameters['hedgeSettings.points']),
        premiumPercentage: parseFloat(apiStrategyConfig.parameters['hedgeSettings.premiumPercentage'])
      },

      // Risk Management Settings
      riskManagement: {
        overallStopLoss: parseFloat(apiStrategyConfig.parameters['riskManagement.overallStopLoss']),
        overallStopLossType: apiStrategyConfig.parameters['riskManagement.overallStopLossType'] as AmountOrPercent,
        overallTarget: parseFloat(apiStrategyConfig.parameters['riskManagement.overallTarget']),
        overallTargetType: apiStrategyConfig.parameters['riskManagement.overallTargetType'] as AmountOrPercent,
        profitLock: apiStrategyConfig.parameters['riskManagement.profitLock'] === 'true',
        profitLockThreshold: parseFloat(apiStrategyConfig.parameters['riskManagement.profitLockThreshold']),
        profitLockThresholdType: apiStrategyConfig.parameters['riskManagement.profitLockThresholdType'] as AmountOrPercent,
        profitLockRetracement: parseFloat(apiStrategyConfig.parameters['riskManagement.profitLockRetracement']),
        profitLockRetracementType: apiStrategyConfig.parameters['riskManagement.profitLockRetracementType'] as AmountOrPercent,
        trailingStopLoss: apiStrategyConfig.parameters['riskManagement.trailingStopLoss'] === 'true',
        trailingStopLossType: apiStrategyConfig.parameters['riskManagement.trailingStopLossType'] as AmountOrPercent,
        trailingStopLossStep: parseFloat(apiStrategyConfig.parameters['riskManagement.trailingStopLossStep']),
        trailingStopLossTrail: parseFloat(apiStrategyConfig.parameters['riskManagement.trailingStopLossTrail']),
        moveToCostOnProfit: apiStrategyConfig.parameters['riskManagement.moveToCostOnProfit'] === 'true',
        moveToCostThreshold: parseFloat(apiStrategyConfig.parameters['riskManagement.moveToCostThreshold']),
        moveToCostThresholdType: apiStrategyConfig.parameters['riskManagement.moveToCostThresholdType'] as AmountOrPercent,
        exitAndReEnter: apiStrategyConfig.parameters['riskManagement.exitAndReEnter'] === 'true',
        exitAndReEnterThreshold: parseFloat(apiStrategyConfig.parameters['riskManagement.exitAndReEnterThreshold']),
        exitAndReEnterThresholdType: apiStrategyConfig.parameters['riskManagement.exitAndReEnterThresholdType'] as AmountOrPercent,
      },
      webhookUrl: apiStrategyConfig.parameters['webhookUrl']
    };
    return strategy;
  }
}
