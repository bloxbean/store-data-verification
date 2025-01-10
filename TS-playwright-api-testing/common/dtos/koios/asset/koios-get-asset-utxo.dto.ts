export interface KoiosGetAssetUtxoDto {
  tx_hash: string;
  tx_index: number;
  address: string;
  value: string;
  stake_address: string;
  payment_cred: string;
  epoch_no: number;
  block_height: number;
  block_time: number;
  datum_hash: null;
  inline_datum: null;
  reference_script: null;
  asset_list: [
    {
      decimals: number;
      quantity: string;
      policy_id: string;
      asset_name: string;
      fingerprint: string;
    },
  ];
  is_spent: boolean;
}
