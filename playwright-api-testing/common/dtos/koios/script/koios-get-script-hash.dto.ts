export interface KoiosGetScriptHashDto {
  script_hash: string;
  redeemers: [
    {
      fee: number;
      purpose: string;
      tx_hash: string;
      tx_index: number;
      unit_mem: number;
      datum_hash: string;
      unit_steps: number;
      datum_value: {
        fields: [];
        constructor: number;
      };
    },
  ];
}
