import type { ISODate, Money, Scope, UserId } from '@/Shared';

// Cashflow 是純運算引擎，不擁有資料；Contract 朝前端輸出結果。
export interface CurvePoint { date: ISODate; balance: Money; }
export interface CurveResult { points: CurvePoint[]; }

export interface Metrics {
  discretionary: Money;   // 本月可自由支配
  runwayMonths: number;   // 緩衝可撐月數
  lowest: CurvePoint;     // 曲線最低點與日期
}

export interface RiskAlert {
  breached: boolean;
  breachDate?: ISODate;
  attribution?: string;
  suggestions?: Array<{ itemId: string; name: string; action: 'delay' | 'cut'; newLowest: Money }>;
}

export interface WhatIfResult { baseLowest: Money; adjustedLowest: Money; delta: Money; }

export interface ICashflowEngine {
  curve(userId: UserId, scope: Scope): Promise<CurveResult>;
  metrics(userId: UserId, scope: Scope): Promise<Metrics>;
  risk(userId: UserId, scope: Scope): Promise<RiskAlert>;
}
