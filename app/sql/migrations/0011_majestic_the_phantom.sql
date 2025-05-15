ALTER TABLE "jobs" ALTER COLUMN "location" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."location";--> statement-breakpoint
CREATE TYPE "public"."location" AS ENUM('remote', 'in-person', 'hybrid');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "location" SET DATA TYPE "public"."location" USING "location"::"public"."location";