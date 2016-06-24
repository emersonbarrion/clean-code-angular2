import { Observable } from "rxjs/observable";
import { Injectable } from "@angular/core";
import { Effect, StateUpdates, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { SdkState } from "../state";
import { heroActionType, HeroAction } from "./hero.action";
import { HeroService } from "./hero.service";

@Injectable()
export class HeroEffect {

	@Effect() heroes$: Observable<Action> = this.updates$
		.whenAction(heroActionType.LOAD_ALL)
		.switchMap(() => this.service.getAll()
			.map(response => this.action.loadAllSuccess(response))
			.catch((error) => Observable.of(this.action.loadAllFail(error)))
		);

	@Effect() heroesRefresh$: Observable<Action> = this.updates$
		.whenAction(heroActionType.REFRESH)
		.map<boolean>(toPayload)
		.switchMap((force) => this.service.refresh(force)
			.map((heroes) => this.action.refreshSuccess(heroes))
			.catch((error) => Observable.of(this.action.refreshFail(error)))
		);

	constructor(
		private updates$: StateUpdates<SdkState>,
		private action: HeroAction,
		private service: HeroService
	) {
	}
}