import * as _ from "lodash";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { CacheFactory, ICacheStore, storageMode, ILog, LoggingFactory } from "@obg/ng2.global";

import { SdkSampleConfigService } from "../config";
import { HeroClient } from "./hero.client";
import { Hero } from "./hero.model";

/*
 - Caching
 - Aggregate data
 - Business logic - validation, messaging
*/
@Injectable()
export class HeroService {

	private id = "heroService";
	private logger: ILog;

	private cache: ICacheStore;
	private CACHE_STORE_KEY = "sdk-sample.hero";

	constructor(
		private client: HeroClient,
		private config: SdkSampleConfigService,
		cacheFactory: CacheFactory,
		logging: LoggingFactory
	) {
		this.logger = logging.get(this.id);

		this.cache = cacheFactory.get(this.CACHE_STORE_KEY, {
			storageMode: storageMode.localStorage
		});
	}

	getAll(): Observable<Hero[]> {
		return this.cache.getOrPutAsObservable("all", () => {
			return this.client.getAll()
				.map(result => {
					this.modify(result);
					this.logger.debug("getAll", "map triggered!", result);
					return result;
				});
		}, {
			maxAge: this.config.getCacheMaxAgeForHeroGetAll()
		});
	}

	refresh(force = false): Observable<Hero[]> {
		if (force) {
			this.cache.remove("all");
		}
		return this.getAll()
			.map(x => {
				this.logger.debug("refresh", `map triggered! force is force '${force}'`, x);
				return x;
			});
	}

	// todo: remove
	private modify(heroes: Hero[]): void {
		heroes[0].name += _.random(0, 9);
		for (let item of heroes) {
			item.popularity += _.random(1, 20);
		}
	}
}