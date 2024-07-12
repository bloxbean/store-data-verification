export interface YaciGetBlockLatestInformationDto {
  time: number;
  height: number;
  number: number;
  hash: string;
  slot: number;
  epoch: number;
  era: number;
  epoch_slot: number;
  slot_leader: string;
  size: number;
  tx_count: number;
  output: number;
  fees: number;
  block_vrf: string;
  op_cert: string;
  op_cert_counter: number;
  op_cert_sigma: string;
  previous_block: string;
  issuer_vkey: string;
  nonce_vrf: null;
  leader_vrf: null;
  vrf_result: {
    output: string;
    proof: string;
  };
  block_body_hash: string;
  protocol_version: number;
}
