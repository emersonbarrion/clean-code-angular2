import "rxjs/Rx";
import {
	it,
	inject,
	describe,
	expect,
	beforeEach,
	beforeEachProviders
} from "@angular/core/testing";
import { provide } from "@angular/core";
import { HTTP_PROVIDERS, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { GLOBAL_PROVIDERS, LoggingService, utils, statusCodes } from "@obg/ng2.global";
import { COMMON_PROVIDERS, CommonHttpClient } from "@obg/ng2.common";

import { SdkSampleConfigService } from "../config";
import { heroes } from "../mock/index";

import { HeroService } from "./hero.service";
import { HeroClient } from "./hero.client";

describe("Hero Integration tests", () => {

	let service: HeroService;
	let configService: SdkSampleConfigService;
	let mockBackend: MockBackend;

	beforeEachProviders(() => [
		HTTP_PROVIDERS,
		GLOBAL_PROVIDERS,
		COMMON_PROVIDERS,
		provide(XHRBackend, { useClass: MockBackend }),
		SdkSampleConfigService,
		HeroService,
		HeroClient
	]);

	beforeEach(inject([
		XHRBackend,
		HeroService,
		SdkSampleConfigService,
		LoggingService,
		CommonHttpClient
	], (
		_mockBackend: MockBackend,
		_service: HeroService,
		_configService: SdkSampleConfigService,
		_loggingService: LoggingService,
		_commonHttpClient: CommonHttpClient
	) => {
			service = _service;
			configService = _configService;
			mockBackend = _mockBackend;

			spyOn(_loggingService, "log").and.stub();

			configService.set({
				baseUri: "http://obg-sdk.test.com"
			});

			utils.httpMock.mockResponse(mockBackend, {
				body: heroes,
				status: statusCodes.OK
			});

			_commonHttpClient.initialize({
				baseUri: "http://obg-sdk.test.com",
				brandId: "b0032790-0fc8-4e38-b98f-71df0a4f6753",
				marketCode: "en"
			});
		}));

	afterEach(() => {
		mockBackend.resolveAllConnections();
		mockBackend.verifyNoPendingRequests();
	});

	describe("when getAll is invoked", () => {
		it("should return all items", (done: Function) => {
			service.getAll()
				.subscribe(x => {
					expect(x.length).toBe(5);
					done();
				});
		});
	});
});