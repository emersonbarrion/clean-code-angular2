import { PlayerClient } from "./player.client";
import { PlayerService } from "./player.service";
import { PlayerAction } from "./player.action";
import { PlayerSelector } from "./player.selector";

export * from "./player.action";
export * from "./player.client";
export * from "./player.effect";
export * from "./player.model";
export * from "./player.reducer";
export * from "./player.selector";
export * from "./player.service";

export const PLAYER_PROVIDERS: any[] = [
	PlayerClient,
	PlayerService,
	PlayerAction,
	PlayerSelector
];