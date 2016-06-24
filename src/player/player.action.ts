import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

import { Player } from "./player.model";

const ACTION_PREFIX = "[Player]";
export const playerActionType = {
	LOAD_ALL: `${ACTION_PREFIX} Load All`,
	LOAD_ALL_SUCCESS: `${ACTION_PREFIX} Load All Success`,
	LOAD_ALL_FAIL: `${ACTION_PREFIX} Load All Failed`,
	REMOVE: `${ACTION_PREFIX} Remove`,

	LOAD_BY_KEY: `${ACTION_PREFIX} Load By Key`,
	LOAD_BY_KEY_SUCCESS: `${ACTION_PREFIX} Load By Key Success`,
	LOAD_BY_KEY_FAIL: `${ACTION_PREFIX} Load By Key Failed`,
	REMOVE_SELECTION: `${ACTION_PREFIX} Remove Selection`
};

@Injectable()
export class PlayerAction {

	loadAll(): Action {
		return {
			type: playerActionType.LOAD_ALL
		};
	}

	loadAllSuccess(players: Player[]): Action {
		return {
			type: playerActionType.LOAD_ALL_SUCCESS,
			payload: players
		};
	}

	loadAllFail(error: any): Action {
		return {
			type: playerActionType.LOAD_ALL_FAIL,
			payload: error
		};
	}

	loadByKey(key: string): Action {
		return {
			type: playerActionType.LOAD_BY_KEY,
			payload: key
		};
	}

	loadByKeySuccess(player: Player): Action {
		return {
			type: playerActionType.LOAD_BY_KEY_SUCCESS,
			payload: player
		};
	}

	loadByKeyFail(error: any): Action {
		return {
			type: playerActionType.LOAD_BY_KEY_FAIL,
			payload: error
		};
	}

	removeSelection(): Action {
		return {
			type: playerActionType.REMOVE_SELECTION
		};
	}

	remove(key: string): Action {
		return {
			type: playerActionType.REMOVE,
			payload: key
		};
	}
}