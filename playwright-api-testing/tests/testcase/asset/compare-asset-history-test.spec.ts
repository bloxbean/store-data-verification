import { test, expect } from "@playwright/test";
import { TxHashes, AssetPolicy, AssetName } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";

test.describe("@regression @smoke @asset", () => {
  test("Compare the asset history of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: get unit information", async () => {
      let unit = await (await yaciService()).getUnitFromDetailTransaction(TxHashes.TX_HASHES_1);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetHistoryKoios = await (
          await koiosService()
        ).getAssetHistory(AssetPolicy.ASSET_POLICY_1, AssetName.ASSET_NAME_1);
        let assetHistoryYaci = await (await yaciService()).getAssetHistoryByUnit(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertEqual(assetHistoryKoios, assetHistoryYaci, "Asset history should be similar.");
        });
      });
    });
  });
});
