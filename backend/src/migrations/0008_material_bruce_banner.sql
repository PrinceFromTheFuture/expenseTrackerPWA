ALTER TABLE "transactions" ALTER COLUMN "budgetId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "paymentMethodId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "userId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");