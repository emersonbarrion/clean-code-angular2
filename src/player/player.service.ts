import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CacheFactory, ICacheStore, storageMode } from "@obg/ng2.global";
import { ILog, LoggingFactory } from "@obg/ng2.global";

import { SdkSampleConfigService } from "../config";
import { PlayerClient } from "./player.client";
import { Player } from "./player.model";

/*
 - Caching
 - Aggregate data
 - Business logic - validation, messaging
*/
@Injectable()
export class PlayerService {

	id = "playerService";

	private memoryCache: ICacheStore;
	private CACHE_STORE_KEY = "sdk-sample.player";
	private logger: ILog;

	constructor(
		private client: PlayerClient,
		private config: SdkSampleConfigService,
		cacheFactory: CacheFactory,
		logging: LoggingFactory
	) {
		this.logger = logging.get(this.id);
		this.memoryCache = cacheFactory.get(`${this.CACHE_STORE_KEY}:mem`, {
			storageMode: storageMode.memory
		});
	}

	getByKey(key: string): Observable<Player> {
		return this.memoryCache.getOrPutAsObservable(`key:${key}`, () => {
			return this.client.getByKey(key);
		}, {
			maxAge: this.config.getCacheMaxAgeForPlayerGetByKey()
		});
	}

	getAll(): Observable<Player[]> {
		return this.client.getAll();
	}
}