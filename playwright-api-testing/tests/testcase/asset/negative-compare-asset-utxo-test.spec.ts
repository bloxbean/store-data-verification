import { AssetList, TxHashes } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @asset", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the asset utxo of Koios and Yaci Store -1", async ({}) => {
    test.step("GIVEN: get unit and asset list information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.FAULT_TX_HASHES);
      let assetList: string[] = Array.from(AssetList.ASSET_LIST_1);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetUtxoKoios = await (
          await koiosService()
        ).getAssetUtxos(assetList, true);
        let assetUtxoYaci = await (await yaciService()).getUtxoOfAsset(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetUtxoKoios,
            assetUtxoYaci,
            "Asset history should not be similar."
          );
        });
      });
    });
  });
});

test.describe("@regression @asset", () => {
  test("Compare the asset utxo of Koios and Yaci Store -2", async ({}) => {
    test.step("GIVEN: get unit and asset list information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.TX_HASHES_1);
      let assetList: string[] = Array.from(AssetList.FAULT_ASSET_LIST);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetUtxoKoios = await (
          await koiosService()
        ).getAssetUtxos(assetList, true);
        let assetUtxoYaci = await (await yaciService()).getUtxoOfAsset(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetUtxoKoios,
            assetUtxoYaci,
            "Asset history should not be similar."
          );
        });
      });
    });
  });
});

test.describe("@regression @asset", () => {
  test("Compare the asset utxo of Koios and Yaci Store -3", async ({}) => {
    test.step("GIVEN: get unit and asset list information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.FAULT_TX_HASHES);
      let assetList: string[] = Array.from(AssetList.FAULT_ASSET_LIST);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetUtxoKoios = await (
          await koiosService()
        ).getAssetUtxos(assetList, true);
        let assetUtxoYaci = await (await yaciService()).getUtxoOfAsset(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetUtxoKoios,
            assetUtxoYaci,
            "Asset history should not be similar."
          );
        });
      });
    });
  });
});
