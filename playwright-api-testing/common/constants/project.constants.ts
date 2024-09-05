export const TimeOut = {
  ONE_SECONDS: 1000,
  TWO_SECONDS: 2 * 1000,
  THREE_SECONDS: 3 * 1000,
  FIVE_SECONDS: 5 * 1000,
  TEN_SECONDS: 10 * 1000,
  TWENTY_SECONDS: 20 * 1000,
  THIRTY_SECONDS: 30 * 1000,
  ONE_MINUTE: 60 * 1000,
  TWO_MINUTES: 60 * 2 * 1000,
} as const;

export const StakeAddresses = {
  STAKE_ADDRESS_1: "stake1uyrx65wjqjgeeksd8hptmcgl5jfyrqkfq0xe8xlp367kphsckq250",
  STAKE_ADDRESS_2: "stake1uxpdrerp9wrxunfh6ukyv5267j70fzxgw0fr3z8zeac5vyqhf9jhy",
  FAULT_STAKE_ADDRESS: "stake1uxpdrerp9wrxunfh6ukyv5267j70",
} as const;

export const BlockHashes = {
  BLOCK_HASHES_1: "fb9087c9f1408a7bbd7b022fd294ab565fec8dd3a8ef091567482722a1fa4e30",
  BLOCK_HASHES_2: "60188a8dcb6db0d80628815be2cf626c4d17cb3e826cebfca84adaff93ad492a",
  BLOCK_HASHES_3: "c6646214a1f377aa461a0163c213fc6b86a559a2d6ebd647d54c4eb00aaab015",
  FAULT_BLOCK_HASHES: "c6646214a1f377a",
} as const;

export const TxHashes = {
  TX_HASHES_1: "f144a8264acf4bdfe2e1241170969c930d64ab6b0996a4a45237b623f1dd670e",
  TX_HASHES_2: "0b8ba3bed976fa4913f19adc9f6dd9063138db5b4dd29cecde369456b5155e94",
  TX_HASHES_3: "0d66c70aa9efa6bc1a635191abef9a0cd386a42b3f43c3199f3b794986995865",
  FAULT_TX_HASHES: "0d66c70aa",
} as const;

export const AssetList = {
  ASSET_LIST_1: ["750900e4999ebe0d58f19b634768ba25e525aaf12403bfe8fe130501", "424f4f4b"],
  ASSET_LIST_2: ["f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a", "6b6f696f732e72657374"],
  FAULT_ASSET_LIST: ["f0ff48bbb7bbe9d59a40f1ce9", "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"],
} as const;

export const AssetPolicy = {
  ASSET_POLICY_1: "750900e4999ebe0d58f19b634768ba25e525aaf12403bfe8fe130501",
  ASSET_POLICY_2: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
  FAULT_ASSET_POLICY: "f0ff48bbb7bbea",
} as const;

export const AssetName = {
  ASSET_NAME_1: "424f4f4b",
  ASSET_NAME_2: "6b6f696f732e72657374",
  FAULT_ASSET_NAME: "6b6f",
} as const;

export const ScriptHash = {
  SCRIPT_HASH_1: "d8480dc869b94b80e81ec91b0abe307279311fe0e7001a9488f61ff8",
  FAULT_SCRIPT_HASH: "d8480dc869b94b80e81ec91b0abe307279311fe0e7001a9488f61ff8",
} as const;

export const Empty = {
  EMPTY: "",
} as const;

export const Mull = {
  NULL: " ",
} as const;
