export interface Player {
	key: string;
	alias: string;
	currentMatch: Match;
	rating: number;
	friends?: string[];
}

export interface Match {
	kills: number;
	deaths: number;
	assists: number;
}

export interface PlayerState {
	isBusy: boolean;
	players?: Player[];
	selectedPlayer?: Player;
};