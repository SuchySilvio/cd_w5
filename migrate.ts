import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Hardcoded DATABASE_URL
const DATABASE_URL = 'postgresql://cdw5_owner:s1RulzvPJgV3@ep-royal-voice-a4z87xd6.us-east-1.aws.neon.tech/cdw5?sslmode=require';

const queryClient = postgres(DATABASE_URL);
const db = drizzle(queryClient, { logger: true });

import { migrate } from "drizzle-orm/postgres-js/migrator";

const sql = postgres(DATABASE_URL, { max: 1 });
await migrate(db, { migrationsFolder: "./drizzle" });
await sql.end();
console.log("Migrations complete");
export { db };
