PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_instagram` (
	`instagramId` integer PRIMARY KEY NOT NULL,
	`url` text,
	`imageId` integer NOT NULL,
	FOREIGN KEY (`imageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_instagram`("instagramId", "url", "imageId") SELECT "instagramId", "url", "imageId" FROM `instagram`;--> statement-breakpoint
DROP TABLE `instagram`;--> statement-breakpoint
ALTER TABLE `__new_instagram` RENAME TO `instagram`;--> statement-breakpoint
PRAGMA foreign_keys=ON;