import { neon } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// 延遲初始化：模組載入時不連線（build 不需 DATABASE_URL）；第一次查詢才建 client。
// Neon HTTP driver（443）：單次 round-trip、不支援多語句 transaction。
let _db: NeonHttpDatabase<typeof schema> | null = null;
export function getDb() {
  if (!_db) _db = drizzle(neon(process.env.DATABASE_URL!), { schema });
  return _db;
}
export { schema };
