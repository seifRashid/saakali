import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// During Vercel build, DATABASE_URL is not available. 
// We handle this gracefully here to avoid crashing the build worker.
// Queries will only fail if executed without a valid connection string at runtime.
const sql = neon(connectionString || "");
export const db = drizzle(sql, { schema });
