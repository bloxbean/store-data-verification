export interface KoiosGetBlockListDto {
  hash: string;
  epoch_no: number;
  abs_slot: number;
  epoch_slot: number;
  block_height: number;
  block_size: number;
  block_time: number;
  tx_count: number;
  vrf_key: string;
  pool: string;
  proto_major: number;
  proto_minor: number;
  op_cert_counter: number;
  parent_hash: string;
}
