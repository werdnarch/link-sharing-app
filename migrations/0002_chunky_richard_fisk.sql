-- Set a default for existing rows
UPDATE "user"
SET last_name = 'Unknown'
WHERE last_name IS NULL;

-- Optionally, set a default for future inserts
ALTER TABLE "user"
ALTER COLUMN "last_name" SET DEFAULT 'Unknown';

-- Make the column NOT NULL
ALTER TABLE "user"
ALTER COLUMN "last_name" SET NOT NULL;