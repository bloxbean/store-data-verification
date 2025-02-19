import {
  AssetName,
  AssetPolicy,
  TxHashes,
} from "@api-common/constants/project.constants";
import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { koiosService } from "@api-common/service/koios-api-service/koios.service";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @asset", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the asset history of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: get unit information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.TX_HASHES_1);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetHistoryKoios = await (
          await koiosService()
        ).getAssetHistory(AssetPolicy.ASSET_POLICY_1, AssetName.ASSET_NAME_1);
        let assetHistoryYaci = await (
          await yaciService()
        ).getAssetHistoryByUnit(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertEqual(
            assetHistoryKoios,
            assetHistoryYaci,
            "Asset history should be similar."
          );
        });
      });
    });
  });
});
