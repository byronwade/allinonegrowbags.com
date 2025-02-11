import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";
import { sql } from "drizzle-orm";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
    -- Create tables if they don't exist
    CREATE TABLE IF NOT EXISTS "_pages_v__blocks_hero" (
      id SERIAL PRIMARY KEY,
      page_id INTEGER NOT NULL,
      heading TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_hero" (
      id SERIAL PRIMARY KEY,
      page_id INTEGER NOT NULL,
      heading TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Add description column
    ALTER TABLE "_pages_v__blocks_hero"
    ADD COLUMN IF NOT EXISTS "description" TEXT;

    ALTER TABLE "pages_blocks_hero"
    ADD COLUMN IF NOT EXISTS "description" TEXT;
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
    DO $$ 
    BEGIN
      -- Only proceed if the tables exist
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '_pages_v__blocks_hero') THEN
        ALTER TABLE "_pages_v__blocks_hero"
        DROP COLUMN IF EXISTS "description";
      END IF;

      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pages_blocks_hero') THEN
        ALTER TABLE "pages_blocks_hero"
        DROP COLUMN IF EXISTS "description";
      END IF;
    END $$;
  `);
}
