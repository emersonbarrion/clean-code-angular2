import * as _ from "lodash";
import { Injectable } from "@angular/core";

import { SdkSampleConfigService } from "../config";
import { SdkState } from "../state";
import { Hero } from "./hero.model";

@Injectable()
export class HeroSelector {

	constructor(
		private config: SdkSampleConfigService
	) {
	}

	getAll() {
		return ($state: SdkState): Hero[] => $state.hero.heroes;
	}

	getAllPopular() {
		return ($state: SdkState): Hero[] => _.filter(this.getAll()($state),
			(x: Hero) => {
				return x.popularity >= this.config.getHeroMinPopularityThreshold();
			});
	}
}