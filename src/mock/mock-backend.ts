import { Injectable, Inject } from "@angular/core";
import { XHRBackend, ReadyState, Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { SdkSampleConfigService } from "../config";
import { registerMockHeroRequests } from "./hero/index";
import { registerMockPlayerRequests } from "./player/index";

@Injectable()
export class SdkSampleMockBackend {

	constructor(
		@Inject(XHRBackend) private backend: MockBackend,
		private config: SdkSampleConfigService
	) {
	}

	initialize(): void {
		registerMockHeroRequests(this.backend, this.config);
		registerMockPlayerRequests(this.backend, this.config);

		this.backend.connections.subscribe((connection: MockConnection) => {
			this.handleNotFound(connection);
		});
	}

	private handleNotFound(connection: MockConnection): void {
		if (connection.readyState !== ReadyState.Open) {
			return;
		}
		connection.mockRespond(new Response(
			new ResponseOptions({
				body: { "error": `${connection.request.url} not found!` },
				status: 404
			})
		));
	}
}