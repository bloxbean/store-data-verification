export interface YaciGetTransactionWitnessesDto {
  tx_hash: string;
  index: number;
  pub_key: string;
  signature: string;
  pub_keyhash: string;
  type: "BOOTSTRAP_WITNESS";
  additional_data: object[];
}
