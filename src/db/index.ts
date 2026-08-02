import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Neon HTTP driver（443，非 pg 5432——沙箱/serverless 相容）。
// 單次 round-trip、不支援多語句 transaction；日後需 transaction 再改 neon-serverless Pool。
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
export { schema };
