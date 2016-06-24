export interface AuthState {
	isAuthenticated: boolean;
	isBusy: boolean;
	alias?: string;
};

export interface LoginParams {
	username: string;
	password: string;
}

export interface LoginResponse {
	alias: string;
}