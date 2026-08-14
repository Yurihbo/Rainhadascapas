CREATE TABLE `sellerItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sellerClientId` varchar(160) NOT NULL,
	`clientId` varchar(200) NOT NULL,
	`item` varchar(200) NOT NULL,
	`quantity` int NOT NULL,
	`unit` varchar(40) NOT NULL,
	`total` varchar(40) NOT NULL,
	`dateLabel` varchar(80) NOT NULL,
	`note` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sellerItems_id` PRIMARY KEY(`id`),
	CONSTRAINT `sellerItems_clientId_unique` UNIQUE(`clientId`)
);
--> statement-breakpoint
CREATE TABLE `sellers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`clientId` varchar(160) NOT NULL,
	`name` varchar(160) NOT NULL,
	`initials` varchar(8) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`total` varchar(40) NOT NULL,
	`status` varchar(40) NOT NULL,
	`updatedLabel` varchar(80) NOT NULL,
	`tone` varchar(40) NOT NULL,
	`avatar` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sellers_id` PRIMARY KEY(`id`),
	CONSTRAINT `sellers_clientId_unique` UNIQUE(`clientId`)
);
--> statement-breakpoint
ALTER TABLE `sellerItems` ADD CONSTRAINT `sellerItems_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sellers` ADD CONSTRAINT `sellers_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;