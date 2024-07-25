export interface YaciGetTransactionDetailsWithdrawalsDto {
  block_number: number;
  block_time: number;
  address: string;
  tx_hash: string;
  amount: number;
  epoch: number;
  slot: number;
}
