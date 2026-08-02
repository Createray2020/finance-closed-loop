import type { Ledger, LedgerId, Money, Scope, UserId } from '../types';

// Foundation：帳本 / 帳戶 / 信用卡，供各業務模組透過 Contract 讀。
export interface AccountDto {
  id: string;
  ledgerId: LedgerId;
  name: string;
  bank: string;
  balance: Money;
}

export type CardPayMode = 'auto' | 'manual';
export interface CardDto {
  id: string;
  ledgerId: LedgerId;
  bank: string;
  name: string;
  last4: string;
  statementDay: number;   // 結帳日
  dueDay: number;         // 繳款截止日
  dueNextMonth: boolean;  // 繳款是否落次月
  payAccountId: string;   // 繳款扣哪個帳戶
  payMode: CardPayMode;
}

export interface ILedgerApi {
  list(userId: UserId): Promise<Ledger[]>;
}
export interface IAccountApi {
  list(userId: UserId, scope: Scope): Promise<AccountDto[]>;
  // 範圍內帳戶餘額加總 = 流動資產起點
  liquidTotal(userId: UserId, scope: Scope): Promise<Money>;
}
export interface ICardApi {
  list(userId: UserId, scope: Scope): Promise<CardDto[]>;
}
