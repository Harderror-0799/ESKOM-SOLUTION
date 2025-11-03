ALTER TABLE `users` MODIFY COLUMN `openId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `loginMethod` varchar(64) DEFAULT 'phone';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` text;--> statement-breakpoint
ALTER TABLE `users` ADD `inviteCode` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `balance` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_phone_unique` UNIQUE(`phone`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_inviteCode_unique` UNIQUE(`inviteCode`);