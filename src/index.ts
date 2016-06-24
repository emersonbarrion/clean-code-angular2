/* tslint:disable:no-unused-variable */
// note: needed to export SDK_SAMPLE_REDUCERS and generate typings correctly.
import { Action } from "@ngrx/store";
import { AUTH_PROVIDERS, authReducer, AuthState, AuthEffect } from "./auth/index";
import { HERO_PROVIDERS, heroReducer, HeroState, HeroEffect } from "./hero/index";
import { PLAYER_PROVIDERS, playerReducer, PlayerState, PlayerEffect } from "./player/index";
/* tslint:enable */

import { SdkSampleConfigService } from "./config";

export * from "./state";
export * from "./config";
export * from "./hero/index";
export * from "./player/index";
export * from "./auth/index";

export * from "./mock/index";

export const SDK_SAMPLE_REDUCER = {
	auth: authReducer,
	hero: heroReducer,
	player: playerReducer
};

export const SDK_SAMPLE_EFFECTS: any[] = [
	AuthEffect,
	HeroEffect,
	PlayerEffect
];

export const SDK_SAMPLE_PROVIDERS: any[] = [
	HERO_PROVIDERS,
	PLAYER_PROVIDERS,
	AUTH_PROVIDERS,

	SdkSampleConfigService
];