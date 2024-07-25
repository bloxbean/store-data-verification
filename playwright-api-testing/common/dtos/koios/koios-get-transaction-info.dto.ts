export interface KoiosGetTransactionInfoDto {
  tx_hash: string;
  block_hash: string;
  block_height: number;
  epoch_no: number;
  epoch_slot: number;
  tx_timestamp: number;
  tx_block_index: number;
  tx_size: number;
  total_output: string;
  fee: string;
  deposit: number;
  invalid_before: null;
  invalid_after: string;
  collateral_inputs: [];
  collateral_output: null;
  reference_inputs: [];
  inputs: [
    {
      value: string;
      tx_hash: string;
      tx_index: number;
      asset_list: [];
      datum_hash: null;
      stake_addr: string;
      inline_datum: null;
      payment_addr: {
        cred: string;
        bech32: string;
      };
      reference_script: null;
    },
  ];
  outputs: [
    {
      value: string;
      tx_hash: string;
      tx_index: number;
      asset_list: [];
      datum_hash: null;
      stake_addr: string;
      inline_datum: null;
      payment_addr: {
        cred: string;
        bech32: string;
      };
      reference_script: null;
    },
  ];
  withdrawals: [];
  assets_minted: [];
  metadata: null;
  certificates: [];
  native_scripts: [];
  plutus_contracts: [];
}
