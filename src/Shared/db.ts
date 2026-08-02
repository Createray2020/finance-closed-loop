// Neon (Postgres) 連線佔位 — 下一個里程碑接 Shared 資料層時啟用。
// 屆時：import { neon } from '@neondatabase/serverless';
//       export const sql = neon(process.env.DATABASE_URL!);
export const DATABASE_URL = process.env.DATABASE_URL;
export function assertDbConfigured(): void {
  if (!DATABASE_URL) throw new Error('DATABASE_URL 尚未設定（Neon 連線字串）');
}
