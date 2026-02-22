import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// On Vercel, next build evaluates modules but DATABASE_URL might be missing.
// We provide a valid-formatted placeholder to satisfy the neon() constructor.
// It will only fail at runtime if a real query is executed without a valid URL.
const sql = neon(connectionString || "postgres://db.saakali.com/placeholder");
export const db = drizzle(sql, { schema });
