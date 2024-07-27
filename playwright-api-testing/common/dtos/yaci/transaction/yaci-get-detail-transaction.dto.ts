export interface YaciGetDetailTransactionDto {
  block_number: number;
  block_time: number;
  tx_hash: string;
  outtput_index: number;
  slot: number;
  block_hash: string;
  epoch: number;
  owner_addr: string;
  owner_stake_addr: string;
  owner_stake_credential: string;
  lovelace_amount: number;
  amount: [
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
}
