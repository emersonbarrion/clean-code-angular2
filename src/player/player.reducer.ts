import { Action } from "@ngrx/store";

import { Player, PlayerState } from "./player.model";
import { playerActionType } from "./player.action";

const initialState: PlayerState = {
	isBusy: false,
	players: []
};

export function playerReducer(state = initialState, action: Action): PlayerState {
	switch (action.type) {
		case playerActionType.LOAD_ALL:
		case playerActionType.LOAD_BY_KEY: {
			return Object.assign({}, state, {
				isBusy: true
			});
		}
		case playerActionType.LOAD_ALL_SUCCESS: {
			const response: Player[] = action.payload;
			return Object.assign({}, state, {
				isBusy: false,
				players: response
			});
		}
		case playerActionType.LOAD_ALL_FAIL: {
			return Object.assign({}, state, {
				isBusy: false,
				players: []
			});
		}
		case playerActionType.REMOVE: {
			const key: string = action.payload;
			return Object.assign({}, state, {
				players: state.players.filter(x => x.key !== key)
			});
		}
		case playerActionType.LOAD_BY_KEY_SUCCESS: {
			const response: Player = action.payload;
			return Object.assign({}, state, {
				isBusy: false,
				selectedPlayer: response
			});
		}
		case playerActionType.LOAD_BY_KEY_FAIL: {
			return Object.assign({}, state, {
				isBusy: false,
				selectedPlayer: undefined
			});
		}
		case playerActionType.REMOVE_SELECTION: {
			return Object.assign({}, state, {
				selectedPlayer: undefined
			});
		}
		default:
			return state;
	}
}