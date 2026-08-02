import {
  pgTable,
  text,
  integer,
  boolean,
  date,
  timestamp,
  serial,
} from 'drizzle-orm/pg-core';

/**
 * 個人財務閉環系統 — 資料綱要（Drizzle + Neon）
 * 規則：每筆業務資料綁 user_id（Clerk）＋ ledger_id（帳本）。資料隔離走 app 層（lib/scope）。
 */

// 帳本（個人 / 各公司單位）— 核心維度
export const ledgers = pgTable('ledgers', {
  id: text('id').primaryKey(),          // 'personal' / 'sensebar' / uuid
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),         // 'personal' | 'company'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 帳戶（銀行活存等）
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  ledgerId: text('ledger_id').notNull(),
  name: text('name').notNull(),
  bank: text('bank'),
  balance: integer('balance').notNull().default(0),  // NT$ 整數到元
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 信用卡（各自結帳/繳款規則）
export const cards = pgTable('cards', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  ledgerId: text('ledger_id').notNull(),
  bank: text('bank').notNull(),
  name: text('name').notNull(),
  last4: text('last4'),
  statementDay: integer('statement_day').notNull(),   // 結帳日
  dueDay: integer('due_day').notNull(),               // 繳款截止日
  dueNextMonth: boolean('due_next_month').notNull().default(true),
  payAccountId: text('pay_account_id'),               // 繳款扣哪個帳戶
  payMode: text('pay_mode').notNull().default('auto'),// 'auto' | 'manual'
  creditLimit: integer('credit_limit'),
  used: integer('used').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 自訂支出類別
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
});

// 支出項目目錄
export const expenseItems = pgTable('expense_items', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  ledgerId: text('ledger_id').notNull(),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  cycle: text('cycle').notNull(),            // 'monthly' | 'once'
  dueDay: integer('due_day'),                // monthly
  date: date('date'),                        // once
  payType: text('pay_type').notNull(),       // 'acct' | 'card'
  payId: text('pay_id').notNull(),           // account/card id
  cardSettle: text('card_settle'),           // 'immediate' | 'statement'
  comp: text('comp').notNull().default('fixed'), // fixed | delayable | cuttable
  category: text('category').notNull().default('未分類'),
  active: boolean('active').notNull().default(true),
});

// 收入（即時 / 預期）
export const incomes = pgTable('incomes', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  ledgerId: text('ledger_id').notNull(),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  cycle: text('cycle').notNull(),            // 'monthly' | 'once'
  dueDay: integer('due_day'),
  date: date('date'),
  kind: text('kind').notNull(),              // 'actual' | 'expected'
  status: text('status'),                    // 'confirmed' | null
  confirmedDate: date('confirmed_date'),
  projectId: text('project_id'),             // 收款節點 → 專案
});

// 專案
export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  ledgerId: text('ledger_id').notNull(),
  name: text('name').notNull(),
  goal: text('goal'),                        // 主要目標
  expectedRevenue: integer('expected_revenue').notNull().default(0),
  start: date('start'),
  due: date('due'),
  phase: text('phase').notNull().default('planning'), // planning | active | done
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 待辦
export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  projectId: text('project_id').notNull(),
  text: text('text').notNull(),
  done: boolean('done').notNull().default(false),
  doneDate: date('done_date'),
});

// 現金流設定（安全底線）
export const cashflowSettings = pgTable('cashflow_settings', {
  userId: text('user_id').primaryKey(),
  safetyMode: text('safety_mode').notNull().default('auto'), // 'auto' | 'manual'
  safetyManual: integer('safety_manual').notNull().default(45000),
});
