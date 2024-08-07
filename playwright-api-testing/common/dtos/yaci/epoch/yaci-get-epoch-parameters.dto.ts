export interface YaciGetEpochParametersDto {
  min_fee_a: number;
  min_fee_b: number;
  max_block_size: number;
  max_tx_size: number;
  max_block_header_size: number;
  key_deposit: string;
  pool_deposit: string;
  a0: number;
  rho: number;
  tau: number;
  decentralisation_param: number;
  extra_entropy: string;
  protocol_major_ver: number;
  protocol_minor_ver: number;
  min_utxo: string;
  min_pool_cost: string;
  nonce: string;
  cost_models: {
    additionalProp1: {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    };
    additionalProp2: {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    };
    additionalProp3: {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    };
  };
  price_mem: number;
  price_step: number;
  max_tx_ex_mem: string;
  max_tx_ex_steps: string;
  max_block_ex_mem: string;
  max_block_ex_steps: string;
  max_val_size: string;
  collateral_percent: number;
  max_collateral_inputs: number;
  coins_per_utxo_size: string;
  pvt_motion_no_confidence: number;
  pvt_committee_normal: number;
  pvt_committee_no_confidence: number;
  pvt_hard_fork_initiation: number;
  dvt_motion_no_confidence: number;
  dvt_committee_normal: number;
  dvt_committee_no_confidence: number;
  dvt_update_to_constitution: number;
  dvt_hard_fork_initiation: number;
  dvt_ppnetwork_group: number;
  dvt_ppeconomic_group: number;
  dvt_pptechnical_group: number;
  dvt_ppgov_group: number;
  dvt_treasury_withdrawal: number;
  committee_min_size: number;
  committee_max_term_length: number;
  gov_action_lifetime: number;
  gov_action_deposit: number;
  drep_deposit: number;
  drep_activity: number;
  e_max: number;
  n_opt: number;
}
