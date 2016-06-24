import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

import { Hero } from "./hero.model";

const ACTION_PREFIX = "[HERO]";
export const heroActionType = {
	LOAD_ALL: `${ACTION_PREFIX} Load All`,
	LOAD_ALL_SUCCESS: `${ACTION_PREFIX} Load All Success`,
	LOAD_ALL_FAIL: `${ACTION_PREFIX} Load All Fail`,
	REFRESH: `${ACTION_PREFIX} Refresh`,
	REFRESH_SUCCESS: `${ACTION_PREFIX} Refresh Success`,
	REFRESH_FAIL: `${ACTION_PREFIX} Refresh Fail`,
	REMOVE: `${ACTION_PREFIX} Remove`
};

@Injectable()
export class HeroAction {

	loadAll(): Action {
		return {
			type: heroActionType.LOAD_ALL
		};
	}

	loadAllSuccess(heroes: Hero[]): Action {
		return {
			type: heroActionType.LOAD_ALL_SUCCESS,
			payload: heroes
		};
	}

	loadAllFail(error: any): Action {
		return {
			type: heroActionType.LOAD_ALL_FAIL,
			payload: error
		};
	}

	refresh(force = false): Action {
		return {
			type: heroActionType.REFRESH,
			payload: force
		};
	}

	refreshSuccess(heroes: Hero[]): Action {
		return {
			type: heroActionType.REFRESH_SUCCESS,
			payload: heroes
		};
	}

	refreshFail(error: any): Action {
		return {
			type: heroActionType.REFRESH_FAIL,
			payload: error
		};
	}

	remove(id: number): Action {
		return {
			type: heroActionType.REMOVE,
			payload: id
		};
	}
}