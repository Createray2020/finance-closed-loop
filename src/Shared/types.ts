// Shared kernel — 貫穿全系統的核心型別。帳本(Ledger)是核心維度，每筆業務資料都帶 ledgerId。
export type UserId = string;
export type LedgerId = string;
export type ISODate = string; // 'YYYY-MM-DD'（時區 Asia/Taipei）

export type LedgerType = 'personal' | 'company';
export interface Ledger {
  id: LedgerId;
  name: string;
  type: LedgerType;
}

// 查詢範圍：全部帳本或單一帳本
export type Scope = { kind: 'all' } | { kind: 'ledger'; ledgerId: LedgerId };

// 金額：單一幣別 NT$，整數到元
export type Money = number;
