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

  static getBlockTransaction = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/block_txs`;
    }
  };

  static getTransactionInformation = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/tx_info`;
    }
  };

  static submitTransaction = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/submittx`;
    }
  };

  static getTransactionStatus = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/tx_status`;
    }
  };

  static getEpochInformation = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/epoch_info`;
    }
  };

  static getEpochProtocolParameters = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/epoch_params`;
    }
  };

  static getEpochBlockProtocols = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/epoch_block_protocols`;
    }
  };

  static getAssetUtxos = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/asset_utxos`;
    }
  };

  static getAssetHistory = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/asset_history`;
    }
  };

  static getPoolRegistration = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/pool_registrations`;
    }
  };

  static getScriptRedeemers = class {
    public static get Base() {
      return `${Koios.BASE_KOIOS_MAIN_NET_URL}/script_redeemers`;
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

  static getUtxo = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/utxos`;
    }
  };

  static getEpoch = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/epochs`;
    }
  };

  static getAsset = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/assets`;
    }
  };

  static getPoolRegistrations = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/pools/registrations`;
    }
  };

  static getScript = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/scripts`;
    }
  };

  static getVotes = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/governance/votes`;
    }
  };

  static getDelegationVotes = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/governance/delegation-votes`;
    }
  };

  static getDrepRegistrations = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/governance/dreps/registrations`;
    }
  };

  static getGovernanceActionProposals = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/governance/proposals`;
    }
  };

  static getCommitteeRegistrations = class {
    public static get Base() {
      return `${YaciStore.BASE_YACI_STORE_MAIN_NET_URL}/governance/committtees/regrstrations`;
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
