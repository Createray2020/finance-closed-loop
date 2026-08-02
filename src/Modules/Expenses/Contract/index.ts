import type { ISODate, LedgerId, Money, Scope, UserId } from '@/Shared';

// 可壓縮性：不可動 / 可延後 / 可砍（供 Cashflow 2.3 建議動作）
export type Compressibility = 'fixed' | 'delayable' | 'cuttable';

export type PaymentMethod =
  | { type: 'account'; accountId: string }
  | { type: 'card'; cardId: string; settle: 'immediate' | 'statement' };

// 展開後的單筆支出實例（Cashflow 用來算曲線；卡費 date 已換算成繳款日）
export interface ExpenseInstanceDto {
  itemId: string;
  ledgerId: LedgerId;
  name: string;
  amount: Money;
  date: ISODate;
  compressibility: Compressibility;
  category: string;
}

export interface IExpenseApi {
  getInstances(userId: UserId, from: ISODate, to: ISODate, scope: Scope): Promise<ExpenseInstanceDto[]>;
}
