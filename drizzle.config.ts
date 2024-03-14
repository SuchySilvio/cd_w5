import { defineConfig } from "drizzle-kit";

const DATABASE_URL = 'postgresql://cdw5_owner:s1RulzvPJgV3@ep-royal-voice-a4z87xd6.us-east-1.aws.neon.tech/cdw5?sslmode=require';

export default defineConfig({
  schema: "./server/db/schema",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: DATABASE_URL,
  },
  verbose: true,
  strict: true, 
});
