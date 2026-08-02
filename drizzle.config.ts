import { config } from 'dotenv';
config({ path: '.env.local' }); // drizzle-kit CLI 不會自動讀 .env.local
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;
