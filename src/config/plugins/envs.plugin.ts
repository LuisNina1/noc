import "dotenv/config";
import * as env from "env-var";

export const envVars = {
	PORT: env.get("PORT").required().asPortNumber(),
};
