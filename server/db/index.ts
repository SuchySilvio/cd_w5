import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const DATABASE_URL = 'postgresql://cdw5_owner:s1RulzvPJgV3@ep-royal-voice-a4z87xd6.us-east-1.aws.neon.tech/cdw5?sslmode=require';


const queryClient = postgres(DATABASE_URL);
export const db = drizzle(queryClient,  { logger: true });