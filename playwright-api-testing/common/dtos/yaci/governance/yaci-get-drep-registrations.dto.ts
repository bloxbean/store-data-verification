export interface YaciGetDrepRegistrationsDto {
  block_number: number;
  block_time: number;
  tx_hash: string;
  cert_index: number;
  type: string;
  slot: number;
  deposit: number;
  drep_hash: string;
  drep_id: string;
  anchor_url: string;
  anchor_hash: string;
  cred_type: string;
  epoch: number;
}
