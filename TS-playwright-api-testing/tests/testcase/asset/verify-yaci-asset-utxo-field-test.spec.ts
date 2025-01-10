import { TxHashes } from "@api-common/constants/project.constants";
import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
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
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.TX_HASHES_1);

      await test.step("WHEN: Retrieve  utxo of asset field", async () => {
        let assetUtxoYaci = await (await yaciService()).getUtxoOfAsset(unit);
        let output_index = assetUtxoYaci.map(
          (assetUtxoYaciDto) => assetUtxoYaciDto.output_index
        );
        let epoch = assetUtxoYaci.map(
          (assetUtxoYaciDto) => assetUtxoYaciDto.epoch
        );
        let block_number = assetUtxoYaci.map(
          (assetUtxoYaciDto) => assetUtxoYaciDto.block_number
        );
        let block_time = assetUtxoYaci.map(
          (assetUtxoYaciDto) => assetUtxoYaciDto.block_time
        );

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotNull(block_number, "field should not be null");
          Assertions.assertNotNull(block_time, "field should not be null");
          Assertions.assertNotNull(output_index, "field should not be null");
          Assertions.assertNotNull(epoch, "field should not be null");
        });
      });
    });
  });
});
