export interface KoiosGetAssetHistoryDto {
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  minting_txs: [
    {
      tx_hash: string;
      metadata: [
        {
          key: number;
          json: {
            asset_full_information: {
              name: string;
              symbol: string;
              minting: {
                type: string;
                blockchain: string;
                mintedBeforeSlotNumber: number;
              };
              tokenType: string;
              description: string;
              totalSupply: number;
            };
          };
        },
      ];
      quantity: string;
      block_time: string;
    },
  ];
}
