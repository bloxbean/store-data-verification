export interface KoiosGetPoolRegistrationsDto {
  pool_id_bech32: string;
  tx_hash: string;
  block_hash: string;
  block_height: number;
  epoch_no: number;
  epoch_slot: number;
  active_epoch_no: number;
}
