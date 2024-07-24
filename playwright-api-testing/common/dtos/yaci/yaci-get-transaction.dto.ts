export interface YaciGetTransactionDto {
  tx_hash: string;
  block_number: number;
  slot: number;
  output_addresses: string[];
  total_output: number;
  fee: number;
}
