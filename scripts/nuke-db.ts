import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "drizzle-orm";
import { createPool } from "@vercel/postgres";

async function nukeDatabase() {
	try {
		const pool = createPool({
			connectionString: process.env.POSTGRES_URL,
		});

		const db = drizzle(pool);

		console.log("🔥 Nuking database...");

		await db.execute(sql`
      DO $$ 
      DECLARE 
        r RECORD;
      BEGIN
        -- Disable triggers
        SET session_replication_role = 'replica';
        
        -- Drop all tables
        FOR r IN (
          SELECT tablename 
          FROM pg_tables 
          WHERE schemaname = current_schema()
        ) 
        LOOP
          EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;

        -- Drop all custom types
        FOR r IN (
          SELECT t.typname
          FROM pg_type t
          JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
          WHERE n.nspname = current_schema()
          AND t.typtype = 'e'
        )
        LOOP
          EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
        END LOOP;

        -- Re-enable triggers
        SET session_replication_role = 'origin';
      END $$;
    `);

		console.log("💥 Database nuked successfully!");
		process.exit(0);
	} catch (error) {
		console.error("Error nuking database:", error);
		process.exit(1);
	}
}

nukeDatabase();
