ALTER TABLE "users" ALTER COLUMN "hashedPassword" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "hashedPassword" DROP DEFAULT;