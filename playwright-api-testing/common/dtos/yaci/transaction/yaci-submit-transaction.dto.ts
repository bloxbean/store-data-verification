export interface YaciSubmitTransactionDto {
  block_number: number;
  block_time: number;
  tx_hash: string;
  output_index: number;
  slot: number;
  block_hash: string;
  epoch: number;
  owner_addr: string;
  owner_stake_addr: string;
  owner_payment_credential: string;
  owner_stake_credential: string;
  lovelace_amount: number;
  amounts: [
    {
      unit: string;
      policy_id: string;
      asset_name: string;
      quantity: number;
    },
  ];
  data_hash: string;
  inline_datum: string;
  script_ref: string;
  reference_script_hash: string;
  is_collateral_return: boolean;
}
