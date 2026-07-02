import nodemailer from "nodemailer";
import { envVars } from "../../config/plugins/envs.plugin";

interface SendEmailOptions {
	to: string;
	subject: string;
	htmlBody: string;
	attachments?: string[];
}
export class EmailService {
	private transporter = nodemailer.createTransport({
		service: envVars.MAILER_SERVICE,
		auth: {
			user: envVars.MAILER_EMAIL,
			pass: envVars.MAILER_SECRET_KEY,
		},
	});

	async sendEmail(options: SendEmailOptions): Promise<boolean> {
		const { to, subject, htmlBody } = options;
		try {
			const sentInformation = await this.transporter.sendMail({
				to: to,
				subject: subject,
				html: htmlBody,
			});
			console.log(sentInformation);

			return true;
		} catch (error) {
			return false;
		}
	}
}
