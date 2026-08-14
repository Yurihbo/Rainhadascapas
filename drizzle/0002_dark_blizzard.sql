CREATE TABLE `userActivities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`action` varchar(80) NOT NULL,
	`description` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userActivities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `userActivities` ADD CONSTRAINT `userActivities_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;