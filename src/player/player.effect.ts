import { Observable } from "rxjs/observable";
import { Injectable } from "@angular/core";
import { Effect, StateUpdates, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { SdkState } from "../state";
import { playerActionType, PlayerAction } from "./player.action";
import { PlayerService } from "./player.service";

@Injectable()
export class PlayerEffect {

	@Effect() player$: Observable<Action> = this.updates$
		.whenAction(playerActionType.LOAD_ALL)
		.switchMap(() => this.service.getAll()
			.map(response => this.action.loadAllSuccess(response))
			.catch((error) => Observable.of(this.action.loadAllFail(error)))
		);

	@Effect() selectedPlayer$: Observable<Action> = this.updates$
		.whenAction(playerActionType.LOAD_BY_KEY)
		.map<string>(toPayload)
		.switchMap((key) => this.service.getByKey(key)
			.map(response => this.action.loadByKeySuccess(response))
			.catch((error) => Observable.of(this.action.loadByKeyFail(error)))
		);

	constructor(
		private updates$: StateUpdates<SdkState>,
		private action: PlayerAction,
		private service: PlayerService
	) {
	}
}