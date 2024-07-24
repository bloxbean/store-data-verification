export interface YaciGetStakeDelegationDto {
  block_number: number;
  block_time: number;
  credential: string;
  address: string;
  pool_id: string;
  tx_hash: string;
  cert_index: number;
  epoch: number;
  slot: number;
  block_hash: string;
}
