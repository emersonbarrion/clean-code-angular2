import { Injectable } from "@angular/core";
import { Effect, StateUpdates, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { SdkState } from "../state";
import { AuthAction, authActionType } from "./auth.action";
import { AuthService } from "./auth.service";
import { LoginParams } from "./auth.model";

@Injectable()
export class AuthEffect {

	@Effect() login$: Observable<Action> = this.updates$
		.whenAction(authActionType.LOGIN)
		.map<LoginParams>(toPayload)
		.switchMap(params => this.service.login(params)
			.map(response => this.action.loginSuccess(response))
			.catch(() => Observable.of(this.action.loginFailed()))
		);

	@Effect() logout$: Observable<Action> = this.updates$
		.whenAction(authActionType.LOGOUT)
		.switchMap(() => this.service.logout()
			.map(response => this.action.logoutSuccess())
			.catch(() => Observable.of(this.action.logoutFailed()))
		);

	constructor(
		private updates$: StateUpdates<SdkState>,
		private action: AuthAction,
		private service: AuthService
	) {

	}
}