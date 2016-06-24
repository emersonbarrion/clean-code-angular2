import { SdkSampleMockBackend } from "./mock-backend";

export * from "./hero/index";
export * from "./player/index";

export * from "./mock-backend";

export const MOCK_SDK_SAMPLE_PROVIDERS: any[] = [
	SdkSampleMockBackend
];