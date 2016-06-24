import { AuthState } from "./auth/index";
import { HeroState } from "./hero/index";
import { PlayerState } from "./player/index";

export interface SdkState {
	auth: AuthState;
	hero: HeroState;
	player: PlayerState;
}