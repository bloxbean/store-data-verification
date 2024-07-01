import { FullConfig, PlaywrightWorkerOptions } from "@playwright/test";
import { APIService, HttpMethod, Response } from "@common/api/apiService";
import { Env } from "@env/env";

async function globalSetup(config: FullConfig, options: PlaywrightWorkerOptions): Promise<void> {
  // Create a new instance of the APIService with the desired API environment URL
  const apiService = new APIService(Env.DB_CONN_STRING);

  // Store the APIService instance in the global context
  // so it can be accessed by tests
  (global as any).apiService = apiService;
}

export default globalSetup;
