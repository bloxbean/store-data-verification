import { TxHashes } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @asset", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the asset utxo of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: get unit and asset list information", async () => {
      let unit = await (await yaciService()).getUnitFromDetailTransaction(TxHashes.TX_HASHES_1);

      await test.step("WHEN: Retrieve  utxo of asset field", async () => {
        let assetUtxoYaci = await (await yaciService()).getUtxoOfAsset(unit);

        await test.step("AND: Retrieve max and min value", async () => {
          let output_index = assetUtxoYaci.map((assetUtxoYaciDto) => assetUtxoYaciDto.output_index);
          let minOutputIndex: number = output_index[0];
          let maxOutputIndex: number = Math.max(...output_index);

          let epoch = assetUtxoYaci.map((assetUtxoYaciDto) => assetUtxoYaciDto.epoch);
          let minEpoch: number = epoch[0];
          let maxEpoch: number = Math.max(...epoch);

          let block_number = assetUtxoYaci.map((assetUtxoYaciDto) => assetUtxoYaciDto.block_number);
          let minBlockNumber: number = block_number[0];
          let maxBlockNumber: number = Math.max(...block_number);

          let block_time = assetUtxoYaci.map((assetUtxoYaciDto) => assetUtxoYaciDto.block_time);
          let minBlockTime: number = block_time[0];
          let maxBlockTime: number = Math.max(...block_time);

          await test.step("THEN: Compare the asset history", async () => {
            Assertions.assertNotEqual(minBlockNumber, maxBlockNumber, "min and max value should not be equal");
            Assertions.assertNotEqual(minBlockTime, maxBlockTime, "min and max value should not be equal");
            Assertions.assertNotEqual(minOutputIndex, maxOutputIndex, "min and max value should not be equal");
            Assertions.assertNotEqual(minEpoch, maxEpoch, "min and max value should not be equal");
          });
        });
      });
    });
  });
});
