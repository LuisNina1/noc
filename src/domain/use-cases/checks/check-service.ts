import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import type { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly logRepository: LogRepository,
		private readonly succesCallback: SuccesCallback,
		private readonly errorCallback: ErrorCallback,
	) {}

	public async execute(url: string): Promise<boolean> {
		try {
			const req = await fetch(url);
			if (!req.ok) {
				throw new Error(`Error fetching ${url}`);
			}
			this.logRepository.saveLog(
				new LogEntity({
					message: `${url} is okey`,
					level: LogSeverityLevel.low,
					origin: "check-service",
				}),
			);
			this.succesCallback();
			return true;
		} catch (error) {
			const errorMessage = `${url} is not okey. ${error}`;
			const log = new LogEntity({
				message: errorMessage,
				level: LogSeverityLevel.high,
				origin: "check-service",
			});
			this.logRepository.saveLog(log);
			this.errorCallback(errorMessage);
			return false;
		}
	}
}
