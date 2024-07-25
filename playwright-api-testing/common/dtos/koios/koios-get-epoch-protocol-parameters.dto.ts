export interface KoiosGetEpochProtocolParametersDto {
  epoch_no: number;
  min_fee_a: number;
  min_fee_b: number;
  max_block_size: number;
  max_tx_size: number;
  max_bh_size: number;
  key_deposit: string;
  pool_deposit: string;
  max_epoch: number;
  optimal_pool_count: number;
  influence: Float32Array;
  monetary_expand_rate: Float32Array;
  treasury_growth_rate: Float32Array;
  decentralisation: number;
  extra_entropy: null;
  protocol_major: number;
  protocol_minor: number;
  min_utxo_value: string;
  min_pool_cost: string;
  nonce: string;
  block_hash: string;
  cost_models: {
    PlutusV1: object[];
  };
  price_mem: Float32Array;
  price_step: bigint;
  max_tx_ex_mem: number;
  max_tx_ex_steps: number;
  max_block_ex_mem: number;
  max_block_ex_steps: number;
  max_val_size: number;
  collateral_percent: number;
  max_collateral_inputs: 3;
  coins_per_utxo_size: string;
}
