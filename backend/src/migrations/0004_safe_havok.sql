ALTER TABLE "users" ALTER COLUMN "hashedPassword" SET DATA TYPE varchar(1000);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "hashedPassword" DROP DEFAULT;