export interface YaciGetGovernanceCommitteesRegistrationDto {
  block_number: number;
  block_time: number;
  tx_hash: string;
  cert_index: number;
  slot: number;
  cold_key: string;
  hot_key: string;
  cred_type: string;
  epoch: number;
}
