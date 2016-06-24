import * as _ from "lodash";
import { Injectable } from "@angular/core";

import { SdkSampleConfigService } from "../config";
import { SdkState } from "../state";
import { Player } from "./player.model";

@Injectable()
export class PlayerSelector {

	constructor(
		private config: SdkSampleConfigService
	) {
	}

	getSelected() {
		return ($state: SdkState): Player => $state.player.selectedPlayer;
	}

	getAll() {
		return ($state: SdkState): Player[] => $state.player.players;
	}

	getAllHighRated() {
		return ($state: SdkState): Player[] => _.filter(this.getAll()($state),
			(x: Player) => {
				return x.rating <= this.config.getPlayerRatingThreshold();
			});
	}
}