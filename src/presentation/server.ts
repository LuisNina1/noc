import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { logRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new logRepositoryImpl(
	new FileSystemDatasource(),
);

export class Server {
	public static start() {
		console.log("Server started");
		const emailService = new EmailService();
		emailService.sendEmail({
			to: "luisnjj2@gmail.com",
			subject: "Hello",
			htmlBody: "<h1>Hello</h1>",
		});
		// CronService.createJob("*/2 * * * * *", () => {
		// 	const url = "https://localhost:3000";
		// 	new CheckService(
		// 		fileSystemLogRepository,
		// 		() => console.log(`${url} is up`),
		// 		(error) => console.log(error),
		// 	).execute(url);
		// });
	}
}
