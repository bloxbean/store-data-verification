export interface YaciGetAssetHistoryDto {
  block_number: number;
  block_time: number;
  slot: number;
  tx_hash: string;
  policy: string;
  asset_name: string;
  unit: string;
  fingerprint: string;
  quantity: number;
  mint_type: string;
}
