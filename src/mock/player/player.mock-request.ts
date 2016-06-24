import * as _ from "lodash";
import { Response, ResponseOptions  } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { SdkSampleConfigService } from "../../config";
import { players } from "./player.mock-data";

export function registerMockPlayerRequests(
	mockBackend: MockBackend,
	config: SdkSampleConfigService
) {
	let heroStringMatcher = new RegExp(
		`${config.getBaseUri()}/${config.getEndpointPlayers()}/([a-z-]+)`
		);
	mockBackend.connections.subscribe((connection: MockConnection) => {
		const urlToMatch = `${config.getBaseUri()}/${config.getEndpointPlayers()}`;
		if (connection.request.url === urlToMatch) {
			connection.mockRespond(new Response(
				new ResponseOptions({
					body: JSON.stringify(players),
					status: 200
				})
			));
			return;
		}

		if (!connection.request.url.startsWith(`${urlToMatch}/`)) {
			return;
		}

		const heroMatcherResult = connection.request.url.match(heroStringMatcher);
		if (heroMatcherResult) {
			const heroKey = heroMatcherResult[1];
			const hero = _.find(players, { key: heroKey });
			if (!hero) {
				return;
			}
			connection.mockRespond(new Response(
				new ResponseOptions({
					body: JSON.stringify(hero),
					status: 200
				})
			));
		}
	});
}
