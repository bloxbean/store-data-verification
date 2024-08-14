export interface YaciGetVotingProcedureDto {
  block_number: number;
  block_time: number;
  id: string;
  tx_hash: string;
  index: number;
  slot: number;
  voter_type: string;
  voter_hash: string;
  gov_action_tx_hash: string;
  gov_action_index: number;
  vote: number;
  anchor_url: string;
  anchor_hash: string;
  epoch: number;
  drep_id: string;
}
