export interface YaciGetBlockListDto {
  time: number;
  number: number;
  slot: number;
  epoch: number;
  era: number;
  output: number;
  fees: number;
  slot_leader: string;
  size: string;
  tx_count: string;
  issuer_vkey: string;
}
