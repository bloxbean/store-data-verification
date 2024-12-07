export interface YaciGetPoolRegistrationsDto {
  block_number: number;
  block_time: number;
  tx_hash: string;
  cert_index: number;
  pool_id: string;
  vrf_key_hash: string;
  pledge: number;
  cost: number;
  margin: number;
  reward_account: string;
  pool_owners: [string];
  relays: [
    {
      port: number;
      ipv4: string;
      ipv6: string;
      dnsName: string;
    },
    {
      port: number;
      ipv4: null;
      ipv6: null;
      dnsName: string;
    },
  ];
  metadata_url: string;
  metadata_hash: string;
  epoch: number;
  slot: number;
  block_hash: string;
  reward_account_bech32: string;
  pool_id_bech32: string;
}
