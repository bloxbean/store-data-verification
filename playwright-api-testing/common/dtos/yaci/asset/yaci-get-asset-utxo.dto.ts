export interface YaciGetAssetUtxoDto {
  tx_hash: string;
  output_index: number;
  address: string;
  amount: [
    {
      unit: string;
      quantity: number;
    },
  ];
  data_hash: string;
  inline_datum: string;
  reference_script_hash: string;
  epoch: number;
  block_number: number;
  block_time: number;
}
