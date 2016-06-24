export interface Hero {
	id: number;
	name: string;
	imgSrc: string;
	popularity: number;
}

export interface HeroState {
	isBusy: boolean;
	heroes?: Hero[];
};