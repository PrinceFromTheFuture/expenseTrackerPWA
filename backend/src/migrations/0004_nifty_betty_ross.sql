ALTER TABLE "paymentMethods" RENAME COLUMN "iconURL" TO "iconName";--> statement-breakpoint
ALTER TABLE "paymentMethods" ALTER COLUMN "iconName" SET DATA TYPE varchar(20);