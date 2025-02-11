import { MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(`
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
        AND tablename != 'schema_migrations'  -- Keep migration tracking table if it exists
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
        AND t.typtype = 'e'  -- enum types
      )
      LOOP
        EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
      END LOOP;

      -- Re-enable triggers
      SET session_replication_role = 'origin';
    END $$;
  `);
}

// No down migration needed since this is a complete wipe
export async function down(): Promise<void> {
	return;
}
