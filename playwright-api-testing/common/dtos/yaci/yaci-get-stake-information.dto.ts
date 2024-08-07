export interface YaciGetStakeInformationDto {
  block_number: number;
  block_time: number;
  credential: string;
  address: string;
  tx_hash: string;
  cert_index: number;
  type: string;
  epoch: number;
  slot: number;
  block_hash: string;
}
