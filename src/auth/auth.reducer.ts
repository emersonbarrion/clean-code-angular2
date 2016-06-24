import { Action } from "@ngrx/store";

import { authActionType } from "./auth.action";
import { AuthState, LoginResponse } from "./auth.model";

const initialState: AuthState = {
	isAuthenticated: false,
	isBusy: false
};

export function authReducer(state = initialState, action: Action): AuthState {
	switch (action.type) {
		case authActionType.LOGIN: {
			return Object.assign({}, state, {
				isBusy: true
			});
		}
		case authActionType.LOGIN_SUCCESS: {
			const response: LoginResponse = action.payload;
			return Object.assign({}, state, {
				isAuthenticated: true,
				isBusy: false,
				alias: response.alias
			});
		}
		case authActionType.LOGIN_FAIL: {
			return Object.assign({}, state, {
				isAuthenticated: false,
				isBusy: false
			});
		}
		case authActionType.LOGOUT: {
			return Object.assign({}, state, {
				isBusy: true
			});
		}
		case authActionType.LOGOUT_SUCCESS:
			return {
				isAuthenticated: false,
				isBusy: false
			};
		default:
			return state;
	}
}
