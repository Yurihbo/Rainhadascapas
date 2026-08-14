CREATE TABLE `offlineOperations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`operationId` varchar(64) NOT NULL,
	`operationType` varchar(80) NOT NULL,
	`payload` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `offlineOperations_id` PRIMARY KEY(`id`),
	CONSTRAINT `offlineOperations_operationId_unique` UNIQUE(`operationId`)
);
--> statement-breakpoint
ALTER TABLE `offlineOperations` ADD CONSTRAINT `offlineOperations_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;