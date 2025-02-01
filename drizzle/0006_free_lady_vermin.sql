DROP INDEX `artist_name_unique`;--> statement-breakpoint
ALTER TABLE `artist` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `artist_slug_unique` ON `artist` (`slug`);