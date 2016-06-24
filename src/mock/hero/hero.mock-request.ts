import { Response, ResponseOptions  } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { SdkSampleConfigService } from "../../config";
import { heroes } from "./hero.mock-data";

export function registerMockHeroRequests(
	mockBackend: MockBackend,
	config: SdkSampleConfigService
) {
	mockBackend.connections.subscribe((connection: MockConnection) => {
		const urlToMatch = `${config.getBaseUri()}/${config.getEndpointHeroes()}`;
		if (connection.request.url !== urlToMatch) {
			return;
		}

		connection.mockRespond(new Response(
			new ResponseOptions({
				body: JSON.stringify(heroes),
				status: 200
			})
		));
	});
}