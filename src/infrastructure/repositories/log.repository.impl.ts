import type { LogDatasource } from "../../domain/datasources/log-datasource";
import type {
	LogEntity,
	LogSeverityLevel,
} from "../../domain/entities/log.entity";
import type { LogRepository } from "../../domain/repository/log.repository";

export class logRepositoryImpl implements LogRepository {
	constructor(private readonly logDatasource: LogDatasource) {}

	saveLog(log: LogEntity): Promise<void> {
		return this.logDatasource.saveLog(log);
	}

	getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		return this.logDatasource.getLogs(severityLevel);
	}
}
