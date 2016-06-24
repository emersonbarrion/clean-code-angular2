import { Injectable } from "@angular/core";

import { ConfigService, utils } from "@obg/ng2.global";

export interface SdkSampleConfig {
	baseUri: string;
	endpoints?: {
		heroes?: string;
		players?: string;
	};
	hero?: {
		minPopularityThreshold?: number;
	};
	player?: {
		ratingThreshold?: number;
	};
	/**
	 * CacheMaxAge should be set in minutes.
	 */
	cacheMaxAge?: {
		default: number;
		hero: {
			getAll: number;
		};
		player: {
			getByKey: number;
		};
	};
}

@Injectable()
export class SdkSampleConfigService {

	private CONFIG_ROOT_KEY = "sdkSample";

	constructor(
		private configService: ConfigService
	) {
	}

	set(config: SdkSampleConfig): void {
		this.configService.setConfig(this.CONFIG_ROOT_KEY, config);
	}

	getBaseUri(): string {
		return this.configService.getString(`${this.CONFIG_ROOT_KEY}.baseUri`);
	}

	getHeroMinPopularityThreshold(): number {
		return this.configService.getNumber(`${this.CONFIG_ROOT_KEY}.hero.minPopularityThreshold`, null, 3);
	}

	getPlayerRatingThreshold(): number {
		return this.configService.getNumber(`${this.CONFIG_ROOT_KEY}.player.ratingThreshold`, null, 20);
	}

	getEndpointHeroes(): string {
		return this.configService.getString(`${this.CONFIG_ROOT_KEY}.endpoints.heroes`, null, "heroes");
	}

	getEndpointPlayers(): string {
		return this.configService.getString(`${this.CONFIG_ROOT_KEY}.endpoints.players`, null, "players");
	}

	getCacheMaxAgeDefault(): number {
		return utils.time.fromMinutesToMilliseconds(this.configService.getNumber(`${this.CONFIG_ROOT_KEY}.cache.default`, null, 30));
	}

	getCacheMaxAgeForHeroGetAll(): number {
		return utils.time.fromMinutesToMilliseconds(
			this.configService.getNumber(`${this.CONFIG_ROOT_KEY}.cacheMaxAge.hero.getAll`, null, this.getCacheMaxAgeDefault()));
	}

	getCacheMaxAgeForPlayerGetByKey(): number {
		return utils.time.fromMinutesToMilliseconds(
			this.configService.getNumber(`${this.CONFIG_ROOT_KEY}.cacheMaxAge.player.getByKey`, null, this.getCacheMaxAgeDefault()));
	}
}