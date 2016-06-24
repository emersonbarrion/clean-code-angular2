import { HeroClient } from "./hero.client";
import { HeroService } from "./hero.service";
import { HeroAction } from "./hero.action";
import { HeroSelector } from "./hero.selector";

export * from "./hero.client";
export * from "./hero.model";
export * from "./hero.service";
export * from "./hero.effect";
export * from "./hero.reducer";
export * from "./hero.action";
export * from "./hero.selector";

export const HERO_PROVIDERS: any[] = [
	HeroClient,
	HeroService,
	HeroAction,
	HeroSelector
];