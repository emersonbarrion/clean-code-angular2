import { Action } from "@ngrx/store";

import { Hero, HeroState } from "./hero.model";
import { heroActionType } from "./hero.action";

const initialState: HeroState = {
	isBusy: false,
	heroes: []
};

export function heroReducer(state = initialState, action: Action): HeroState {
	switch (action.type) {
		case heroActionType.REFRESH:
		case heroActionType.LOAD_ALL: {
			return Object.assign({}, state, {
				isBusy: true
			});
		}
		case heroActionType.REFRESH_SUCCESS:
		case heroActionType.LOAD_ALL_SUCCESS: {
			const response: Hero[] = action.payload;
			return Object.assign({}, state, {
				isBusy: false,
				heroes: response
			});
		}
		case heroActionType.REFRESH_FAIL:
		case heroActionType.LOAD_ALL_FAIL: {
			return Object.assign({}, state, {
				isBusy: false,
				heroes: []
			});
		}
		case heroActionType.REMOVE: {
			const id: number = action.payload;
			return Object.assign({}, state, {
				heroes: state.heroes.filter(x => x.id !== id)
			});
		}
		default:
			return state;
	}
}