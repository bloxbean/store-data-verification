export interface YaciGetRatificationResultNoConfidenceDto {
  no_confidence: string;
  expired_epoch: string;
  spo_yes_vote_taken: string;
  spo_abstain_vote_taken: string;
  spo_total_stake: string;
  drep_yes_vote_stake: string;
  drep_no_vote_stake: string;
  last_enacted_gov_action_id: string;
  is_action_ratification_delayed: boolean;
  current_epoch_param: string;
}
