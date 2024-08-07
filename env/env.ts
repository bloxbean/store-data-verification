import dotenv from "dotenv";

dotenv.config({
  override: true,
  path: process.env.ENV ? `env/.env.${process.env.ENV}` : `env/.env.local`,
});

export class Env {
  static get KOIOS_API_URL(): string {
    const koiosApiUrl = process.env.KOIOS_API_URL;
    if (!koiosApiUrl) {
      throw new Error("Environment variable KOIOS_API_URL must be set");
    }
    return koiosApiUrl;
  }

  static get YACI_STORE_API_URL(): string {
    const yaciStoreApiUrl = process.env.YACI_STORE_API_URL;
    if (!yaciStoreApiUrl) {
      throw new Error("Environment variable YACI_STORE_API_URL must be set");
    }
    return yaciStoreApiUrl;
  }

  static get YACI_STORE_AGGREGATOR_URL(): string {
    const yaciStoreAggregatorUrl = process.env.YACI_STORE_AGGREGATOR_URL;
    if (!yaciStoreAggregatorUrl) {
      throw new Error("Environment variable YACI_STORE_AGGREGATOR_URL must be set");
    }
    return yaciStoreAggregatorUrl;
  }
}
