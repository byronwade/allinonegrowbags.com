import { MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(`
    -- First ensure payload_migrations table exists
    CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" SERIAL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "batch" INTEGER NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    DO $$ 
    DECLARE 
      r RECORD;
    BEGIN
      -- Drop all tables except payload_migrations with CASCADE
      FOR r IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = current_schema() 
        AND tablename != 'payload_migrations'
        AND tablename != '_migrations'
      ) 
      LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;

      -- Drop all custom types with CASCADE
      FOR r IN (
        SELECT typname 
        FROM pg_type 
        JOIN pg_namespace ON pg_type.typnamespace = pg_namespace.oid 
        WHERE nspname = current_schema() 
        AND typtype = 'e'::char
      )
      LOOP
        EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
      END LOOP;
    END $$;
  `);

	// Create initial migration record
	await payload.create({
		collection: "payload-migrations",
		data: {
			name: "reset-database",
			batch: 1,
			createdAt: new Date().toISOString(),
		},
	});
}

// No down migration needed since this is a reset
export async function down(): Promise<void> {
	return;
}
