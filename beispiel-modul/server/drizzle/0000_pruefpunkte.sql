CREATE TABLE "beispiel_pruefpunkte" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bezeichnung" text NOT NULL,
	"intervall_tage" integer NOT NULL,
	"letzte_pruefung" date,
	"kunde_id" uuid REFERENCES "customers"("id") ON DELETE SET NULL,
	"is_test" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
