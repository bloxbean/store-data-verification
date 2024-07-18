import { Env } from "playwright-api-testing/env/env";

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

  static getAccountTransaction = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/account_txs`;
    }
  };

  static getBlockList = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/blocks`;
    }
  };
}

export class YaciStore {
  static readonly BASE_YACI_STORE_MAIN_NET_URL = Env.YACI_STORE_API_URL;

  static getTransaction = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/txs`;
    }
  };

  static getBlockList = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/blocks`;
    }
  };

  static getBlockLatestInformation = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/blocks/latest`;
    }
  };

  static getStakeRegistrations = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/stake/registrations`;
    }
  };

  static getStakeDeregistrations = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/stake/deregistrations`;
    }
  };

  static getStakeDelegations = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/stake/delegations`;
    }
  };
}

export class YaciStoreAggregator {
  static readonly BASE_YACI_STORE_AGGREGATOR_NET_URL = Env.YACI_STORE_AGGREGATOR_URL;

  static getAggregatorAddresses = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/addresses`;
    }
  };
}
