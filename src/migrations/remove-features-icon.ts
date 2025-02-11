import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(`
		DO $$ BEGIN
			-- First drop the columns that reference the enum
			ALTER TABLE IF EXISTS "pages_blocks_features_features" 
				DROP COLUMN IF EXISTS "icon";
			ALTER TABLE IF EXISTS "_pages_v_blocks_features_features" 
				DROP COLUMN IF EXISTS "icon";

			-- Then drop the enum type
			DROP TYPE IF EXISTS enum__pages_v_blocks_features_features_icon;
		END $$;
	`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(`
		DO $$ BEGIN
			-- First create the enum type if it doesn't exist
			CREATE TYPE enum__pages_v_blocks_features_features_icon AS ENUM (
				'microscope', 'scale', 'filter', 'truck', 'heartHandshake', 'percent'
			);

			-- Then add the columns with the enum type
			ALTER TABLE IF EXISTS "pages_blocks_features_features" 
				ADD COLUMN IF NOT EXISTS "icon" enum__pages_v_blocks_features_features_icon;
			ALTER TABLE IF EXISTS "_pages_v_blocks_features_features" 
				ADD COLUMN IF NOT EXISTS "icon" enum__pages_v_blocks_features_features_icon;
		EXCEPTION
			WHEN duplicate_object THEN NULL;
		END $$;
	`);
}
