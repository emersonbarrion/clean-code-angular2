import { Player } from "../../player/index";

export let players: Player[] = [
	{
		key: "vixxor",
		alias: "vixxor",
		rating: 1,
		currentMatch: {
			kills: 13,
			deaths: 7,
			assists: 10
		},
		friends: [
			"samuche",
			"chiko-hex",
			"oondesta"
		]
	}, {
		key: "chiko-hex",
		alias: "chiko hex",
		rating: 2,
		currentMatch: {
			kills: 25,
			deaths: 4,
			assists: 8
		},
		friends: [
			"samuche",
			"vixxor",
			"scotty"
		]
	}, {
		key: "zeus-hawke",
		alias: "zeus hawke",
		rating: 3,
		currentMatch: {
			kills: 20,
			deaths: 2,
			assists: 13
		},
		friends: [
			"samuche",
			"vixxor",
			"oondesta"
		]
	}, {
		key: "samuche",
		alias: "samuche",
		rating: 50,
		currentMatch: {
			kills: 5,
			deaths: 13,
			assists: 28
		},
		friends: [
			"deathwing",
			"vixxor",
			"elfmar"
		]
	}];