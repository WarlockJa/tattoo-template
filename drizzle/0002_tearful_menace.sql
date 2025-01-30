PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_artist` (
	`artistId` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`imageId` integer,
	`specialty` text,
	`block1ImageId` integer,
	`block1Description` text NOT NULL,
	`block2ImageId` integer,
	`block2Description` text NOT NULL,
	`imageFeed1ImageId` integer,
	`imageFeed2ImageId` integer,
	`imageFeed3ImageId` integer,
	`imageFeed4ImageId` integer,
	`imageFeed5ImageId` integer,
	`imageFeed6ImageId` integer,
	`imageFeed7ImageId` integer,
	`imageFeed8ImageId` integer,
	FOREIGN KEY (`imageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`block1ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`block2ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`imageFeed1ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`imageFeed2ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`imageFeed3ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`imageFeed4ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`imageFeed5ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`imageFeed6ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`imageFeed7ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`imageFeed8ImageId`) REFERENCES `image`(`imageId`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_artist`("artistId", "name", "imageId", "specialty", "block1ImageId", "block1Description", "block2ImageId", "block2Description", "imageFeed1ImageId", "imageFeed2ImageId", "imageFeed3ImageId", "imageFeed4ImageId", "imageFeed5ImageId", "imageFeed6ImageId", "imageFeed7ImageId", "imageFeed8ImageId") SELECT "artistId", "name", "imageId", "specialty", "block1ImageId", "block1Description", "block2ImageId", "block2Description", "imageFeed1ImageId", "imageFeed2ImageId", "imageFeed3ImageId", "imageFeed4ImageId", "imageFeed5ImageId", "imageFeed6ImageId", "imageFeed7ImageId", "imageFeed8ImageId" FROM `artist`;--> statement-breakpoint
DROP TABLE `artist`;--> statement-breakpoint
ALTER TABLE `__new_artist` RENAME TO `artist`;--> statement-breakpoint
PRAGMA foreign_keys=ON;