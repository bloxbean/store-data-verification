import { Env } from "@env/env";

export class Koios {
  static readonly BASE_KOIOS_MAIN_NET_URL = Env.KOIOS_API_URL;

  static getTip = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/tip`;
    }
  };

  static getAccountAddresses = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/account_addresses`;
    }
  };
}
