import type { ISODate, LedgerId, Money, Scope, UserId } from '@/Shared';

export type ProjectPhase = 'planning' | 'active' | 'done';

export interface ProjectDto {
  id: string;
  ledgerId: LedgerId;
  name: string;
  goal: string;            // 主要目標
  expectedRevenue: Money;  // 預期收益
  start: ISODate;
  due: ISODate;
  phase: ProjectPhase;
}

export interface TodoDto {
  id: string;
  projectId: string;
  text: string;
  done: boolean;
  doneDate?: ISODate;
}

// 每月階段性總結（週期＝固定每月）
export interface MonthlySummaryDto {
  month: string;          // 'YYYY-MM'
  doneTodos: number;      // 本月完成待辦數（＝投入度代理指標）
  realized: Money;        // 本月變現
  realizedTotal: Money;   // 累計變現
  targetPct: number;      // 累計達標率
  reached: boolean;       // 是否達預期
  next: string[];         // 接下來要做（未完成待辦）
}

export interface IProjectApi {
  list(userId: UserId, scope: Scope): Promise<ProjectDto[]>;
  // 收款節點透過 Income Contract 建立（帶 projectId）；此處回月結
  monthlySummary(userId: UserId, projectId: string, month: string): Promise<MonthlySummaryDto>;
}
