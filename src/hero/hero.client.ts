import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ILog, LoggingFactory } from "@obg/ng2.global";
import { CommonHttpClient } from "@obg/ng2.common";

import { SdkSampleConfigService } from "../config";
import { Hero } from "./hero.model";

/*
 - Get Data from the Server
 - Transform data if need's be
*/
@Injectable()
export class HeroClient {

	private id = "heroClient";
	private logger: ILog;

	constructor(
		private config: SdkSampleConfigService,
		private commonHttpClient: CommonHttpClient,
		logging: LoggingFactory
	) {
		this.logger = logging.get(this.id);
	}

	getAll(): Observable<Hero[]> {
		return this.commonHttpClient.get<Hero[]>({
			url: this.config.getEndpointHeroes()
		}).share();
	}
}
