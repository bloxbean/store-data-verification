import { AssetList, TxHashes } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @asset", () => {
  test("Compare the asset utxo of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: get unit and asset list information", async () => {
      let unit = await (await yaciService()).getUnitFromDetailTransaction(TxHashes.TX_HASHES_1);
      let assetList: string[] = Array.from(AssetList.ASSET_LIST_1);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetUtxoKoios = await (await koiosService()).getAssetUtxos(assetList, true);
        let assetUtxoYaci = await (await yaciService()).getUtxoOfAsset(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertEqual(assetUtxoKoios, assetUtxoYaci, "Asset history should be similar.");
        });
      });
    });
  });
});
