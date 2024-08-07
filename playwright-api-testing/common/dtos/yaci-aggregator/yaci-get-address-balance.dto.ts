export interface YaciGetAddressBalanceDto {
  block_number: number;
  block_time: number;
  address: string;
  amounts: [
    {
      unit: string;
      policy_id: string;
      asset_name: string;
      quantity: string;
    },
  ];
  slot: number;
  last_balance_calculation_block: number;
}
