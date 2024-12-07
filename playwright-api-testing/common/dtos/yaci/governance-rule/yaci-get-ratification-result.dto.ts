export interface YaciGetRatificationResultDto {
  gov_action: string;
  expired_epoch: string;
  cc_yes_vote: boolean;
  cc_no_vote: boolean;
  cc_threshold: string;
  spo_yes_vote_taken: string;
  spo_abstain_vote_taken: string;
  spo_total_stake: string;
  drep_yes_vote_stake: string;
  drep_no_vote_stake: string;
  cc_state: string;
  last_enacted_gov_action_id: string;
  is_action_ratification_delayed: boolean;
  current_epoch_param: string;
}
