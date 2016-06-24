import { Injectable } from "@angular/core";
import { URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ILog, LoggingFactory } from "@obg/ng2.global";
import { CommonHttpClient } from "@obg/ng2.common";

import { SdkSampleConfigService } from "../config";
import { Player } from "./player.model";

/*
 - Get Data from the Server
 - Transform data if need's be
*/
@Injectable()
export class PlayerClient {

	private id = "playerClient";
	private logger: ILog;

	constructor(
		private config: SdkSampleConfigService,
		private commonHttpClient: CommonHttpClient,
		logging: LoggingFactory
	) {
		this.logger = logging.get(this.id);
	}

	getByKey(key: string): Observable<Player> {
		let search = new URLSearchParams();
		search.set("id", key);

		return this.commonHttpClient.get<Player>({
			url: `${this.config.getEndpointPlayers()}/:id`,
			search
		}).share();
	}

	getAll(): Observable<Player[]> {
		return this.commonHttpClient.get<Player[]>({
			url: this.config.getEndpointPlayers()
		}).share();
	}
}