export interface YaciGetDelegationVoteDto {
  block_number: number;
  block_time: number;
  tx_hash: string;
  cert_index: number;
  slot: number;
  address: string;
  drep_hash: string;
  drep_id: string;
  drep_type: number;
  credential: string;
  cred_type: number;
  epoch: number;
}
