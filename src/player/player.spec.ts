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
import { players } from "../mock/index";

import { PlayerService } from "./player.service";
import { PlayerClient } from "./player.client";

describe("Player Integration tests", () => {

	let service: PlayerService;
	let configService: SdkSampleConfigService;
	let mockBackend: MockBackend;

	beforeEachProviders(() => [
		HTTP_PROVIDERS,
		GLOBAL_PROVIDERS,
		COMMON_PROVIDERS,
		provide(XHRBackend, { useClass: MockBackend }),
		SdkSampleConfigService,
		PlayerService,
		PlayerClient
		]);

	beforeEach(inject([
		XHRBackend,
		PlayerService,
		SdkSampleConfigService,
		LoggingService,
		CommonHttpClient
	], (
		_mockBackend: MockBackend,
		_playerService: PlayerService,
		_configService: SdkSampleConfigService,
		_loggingService: LoggingService,
		_commonHttpClient: CommonHttpClient
	) => {
			service = _playerService;
			configService = _configService;
			mockBackend = _mockBackend;

			spyOn(_loggingService, "log").and.stub();

			configService.set({
				baseUri: "http://obg-sdk.test.com"
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
		beforeEach(() => {
			utils.httpMock.mockResponse(mockBackend, {
				body: players,
				status: statusCodes.OK
			});
		});

		it("should return all items", (done: Function) => {
			service.getAll()
				.subscribe(x => {
					expect(x.length).toBe(4);
					done();
				});
		});
	});

	describe("when getByKey is invoked", () => {
		beforeEach(() => {
			utils.httpMock.mockResponse(mockBackend, {
				body: players[0],
				status: statusCodes.OK,
				url: "http://obg-sdk.test.com/players/vixxor"
			});
		});

		it("should return successfully", (done: Function) => {
			service.getByKey("vixxor")
				.subscribe(x => {
					expect(x).toBeDefined();
					expect(x.alias).toBe("vixxor");
					done();
				});
		});
	});
});