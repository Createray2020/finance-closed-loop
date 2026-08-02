import type { Money } from './types';
// NT$ 整數到元。集中處理，避免各模組各自 round。
export const toMoney = (n: number): Money => Math.round(n);
export const addMoney = (a: Money, b: Money): Money => Math.round(a + b);
export const formatNT = (n: Money): string =>
  (n < 0 ? '-' : '') + 'NT$' + Math.abs(Math.round(n)).toLocaleString('en-US');
