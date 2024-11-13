import { APIService } from "@common/api/api-service";
import { FullConfig, PlaywrightWorkerOptions } from "@playwright/test";
import { Env } from "playwright-api-testing/env/env";

async function globalSetup(
  config: FullConfig,
  options: PlaywrightWorkerOptions
): Promise<void> {
  // Create a new instance of the APIService with the desired API environment URL
  const koiosApiService = new APIService(Env.KOIOS_API_URL);
  const yaciApiService = new APIService(Env.YACI_STORE_API_URL);

  // Store the APIService instance in the global context
  // so it can be accessed by tests
  (global as any).yaciApiService = yaciApiService;
  (global as any).koiosApiService = koiosApiService;
}

export default globalSetup;
