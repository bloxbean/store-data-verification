export interface YaciGetGovernanceActionProposalDto {
  block_number: number;
  block_time: number;
  tx_hash: string;
  index: number;
  slot: number;
  deposit: number;
  return_address: string;
  type: string;
  details: object;
  anchor_url: string;
  anchor_hash: string;
  epoch: number;
}
