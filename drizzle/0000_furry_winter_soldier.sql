CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"ledger_id" text NOT NULL,
	"name" text NOT NULL,
	"bank" text,
	"balance" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cards" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"ledger_id" text NOT NULL,
	"bank" text NOT NULL,
	"name" text NOT NULL,
	"last4" text,
	"statement_day" integer NOT NULL,
	"due_day" integer NOT NULL,
	"due_next_month" boolean DEFAULT true NOT NULL,
	"pay_account_id" text,
	"pay_mode" text DEFAULT 'auto' NOT NULL,
	"credit_limit" integer,
	"used" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cashflow_settings" (
	"user_id" text PRIMARY KEY NOT NULL,
	"safety_mode" text DEFAULT 'auto' NOT NULL,
	"safety_manual" integer DEFAULT 45000 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"ledger_id" text NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"cycle" text NOT NULL,
	"due_day" integer,
	"date" date,
	"pay_type" text NOT NULL,
	"pay_id" text NOT NULL,
	"card_settle" text,
	"comp" text DEFAULT 'fixed' NOT NULL,
	"category" text DEFAULT '未分類' NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "incomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"ledger_id" text NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"cycle" text NOT NULL,
	"due_day" integer,
	"date" date,
	"kind" text NOT NULL,
	"status" text,
	"confirmed_date" date,
	"project_id" text
);
--> statement-breakpoint
CREATE TABLE "ledgers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"ledger_id" text NOT NULL,
	"name" text NOT NULL,
	"goal" text,
	"expected_revenue" integer DEFAULT 0 NOT NULL,
	"start" date,
	"due" date,
	"phase" text DEFAULT 'planning' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"project_id" text NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"done_date" date
);
