import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(`
    -- Create tables if they don't exist
    CREATE TABLE IF NOT EXISTS "_pages_v__blocks_features" (
      id SERIAL PRIMARY KEY,
      page_id INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_features" (
      id SERIAL PRIMARY KEY,
      page_id INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(`
    DO $$ 
    BEGIN
      -- Drop dependent tables first
      DROP TABLE IF EXISTS "pages_blocks_features_features" CASCADE;
      
      -- Then drop main tables
      DROP TABLE IF EXISTS "_pages_v__blocks_features" CASCADE;
      DROP TABLE IF EXISTS "pages_blocks_features" CASCADE;
    END $$;
  `);
}
