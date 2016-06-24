import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CacheFactory, ILog, LoggingFactory } from "@obg/ng2.global";

import { SdkSampleConfigService } from "../config";
import { LoginParams, LoginResponse } from "./auth.model";

@Injectable()
export class AuthService {

	private id = "authService";
	private logger: ILog;

	constructor(
		private config: SdkSampleConfigService,
		cacheFactory: CacheFactory,
		logging: LoggingFactory
	) {
		this.logger = logging.get(this.id);
	}

	login(input: LoginParams): Observable<LoginResponse> {
		this.logger.debug("login", null, input);
		if (input.username === "chiko" && input.password === "piripiri") {
			return Observable.of(<LoginResponse> {
				alias: "mr.chiko"
			});
		}
		return Observable.throw({
			errorCode: "invalid-username"
		});
	}

	logout(): Observable<{}> {
		this.logger.debug("logout");
		return Observable.of({});
	}
}