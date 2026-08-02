import type { ISODate, LedgerId, Money, Scope, UserId } from '@/Shared';

export type IncomeKind = 'actual' | 'expected';   // 即時 / 預期
export type IncomeStatus = 'pending' | 'confirmed';

// 未確認的預期收入（Cashflow 當假設值放進曲線；actual/confirmed 已反映在帳戶餘額）
export interface IncomeEventDto {
  incomeId: string;
  ledgerId: LedgerId;
  name: string;
  amount: Money;
  date: ISODate;
  projectId?: string;   // 若為某專案的收款節點
}

export interface IIncomeApi {
  getExpected(userId: UserId, from: ISODate, to: ISODate, scope: Scope): Promise<IncomeEventDto[]>;
  // 專案已變現金額（actual + confirmed）供 Projects 算達標率
  getRealizedByProject(userId: UserId, projectId: string): Promise<Money>;
}
