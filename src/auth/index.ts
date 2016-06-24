import { AuthService } from "./auth.service";
import { AuthAction } from "./auth.action";

export * from "./auth.service";
export * from "./auth.model";
export * from "./auth.effect";
export * from "./auth.reducer";
export * from "./auth.action";

export const AUTH_PROVIDERS: any[] = [
	AuthService,
	AuthAction
];