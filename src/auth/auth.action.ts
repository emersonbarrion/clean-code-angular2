import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

import { LoginParams, LoginResponse } from "./auth.model";

const ACTION_PREFIX = "[Auth]";
export const authActionType = {
	LOGIN: `${ACTION_PREFIX} Login`,
	LOGIN_SUCCESS: `${ACTION_PREFIX} Login Success`,
	LOGIN_FAIL: `${ACTION_PREFIX} Login Fail`,

	LOGOUT: `${ACTION_PREFIX} Logout`,
	LOGOUT_SUCCESS: `${ACTION_PREFIX} Logout Success`,
	LOGOUT_FAIL: `${ACTION_PREFIX} Logout Fail`
};

@Injectable()
export class AuthAction {

	login(loginParams: LoginParams): Action {
		return {
			type: authActionType.LOGIN,
			payload: loginParams
		};
	}

	loginSuccess(response: LoginResponse): Action {
		return {
			type: authActionType.LOGIN_SUCCESS,
			payload: response
		};
	}

	loginFailed(): Action {
		return {
			type: authActionType.LOGIN_FAIL
		};
	}

	logout(): Action {
		return {
			type: authActionType.LOGOUT
		};
	}

	logoutSuccess(): Action {
		return {
			type: authActionType.LOGOUT_SUCCESS
		};
	}

	logoutFailed(): Action {
		return {
			type: authActionType.LOGOUT_FAIL
		};
	}
}