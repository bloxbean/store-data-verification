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

test.describe("@regression @asset", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the asset history of Koios and Yaci Store using faulty Yaci Store data -1", async ({}) => {
    test.step("GIVEN: get unit information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.FAULT_TX_HASHES);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetHistoryKoios = await (
          await koiosService()
        ).getAssetHistory(AssetPolicy.ASSET_POLICY_1, AssetName.ASSET_NAME_1);
        let assetHistoryYaci = await (
          await yaciService()
        ).getAssetHistoryByUnit(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetHistoryKoios,
            assetHistoryYaci,
            "Asset history should be similar."
          );
        });
      });
    });
  });
});

test.describe("@regression @asset", () => {
  test("Compare the asset history of Koios and Yaci Store using faulty koios data -2", async ({}) => {
    test.step("GIVEN: get unit information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.TX_HASHES_1);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetHistoryKoios = await (
          await koiosService()
        ).getAssetHistory(
          AssetPolicy.FAULT_ASSET_POLICY,
          AssetName.ASSET_NAME_1
        );
        let assetHistoryYaci = await (
          await yaciService()
        ).getAssetHistoryByUnit(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetHistoryKoios,
            assetHistoryYaci,
            "Asset history should be similar."
          );
        });
      });
    });
  });
});

test.describe("@regression @asset", () => {
  test("Compare the asset history of Koios and Yaci Store using faulty Koios data -3", async ({}) => {
    test.step("GIVEN: get unit information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.TX_HASHES_1);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetHistoryKoios = await (
          await koiosService()
        ).getAssetHistory(
          AssetPolicy.ASSET_POLICY_1,
          AssetName.FAULT_ASSET_NAME
        );
        let assetHistoryYaci = await (
          await yaciService()
        ).getAssetHistoryByUnit(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetHistoryKoios,
            assetHistoryYaci,
            "Asset history should be similar."
          );
        });
      });
    });
  });
});

test.describe("@regression @asset", () => {
  test("Compare the asset history of Koios and Yaci Store using faulty data -4", async ({}) => {
    test.step("GIVEN: get unit information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.FAULT_TX_HASHES);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetHistoryKoios = await (
          await koiosService()
        ).getAssetHistory(
          AssetPolicy.FAULT_ASSET_POLICY,
          AssetName.FAULT_ASSET_NAME
        );
        let assetHistoryYaci = await (
          await yaciService()
        ).getAssetHistoryByUnit(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetHistoryKoios,
            assetHistoryYaci,
            "Asset history should be similar."
          );
        });
      });
    });
  });
});

test.describe("@regression @asset", () => {
  test("Compare the asset history of Koios and Yaci Store using faulty data -5", async ({}) => {
    test.step("GIVEN: get unit information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.FAULT_TX_HASHES);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetHistoryKoios = await (
          await koiosService()
        ).getAssetHistory(
          AssetPolicy.ASSET_POLICY_1,
          AssetName.FAULT_ASSET_NAME
        );
        let assetHistoryYaci = await (
          await yaciService()
        ).getAssetHistoryByUnit(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetHistoryKoios,
            assetHistoryYaci,
            "Asset history should be similar."
          );
        });
      });
    });
  });
});

test.describe("@regression @asset", () => {
  test("Compare the asset history of Koios and Yaci Store using faulty data -6", async ({}) => {
    test.step("GIVEN: get unit information", async () => {
      let unit = await (
        await yaciService()
      ).getUnitFromDetailTransaction(TxHashes.FAULT_TX_HASHES);

      await test.step("WHEN: Retrieve previous block hash from the block latest information", async () => {
        let assetHistoryKoios = await (
          await koiosService()
        ).getAssetHistory(
          AssetPolicy.FAULT_ASSET_POLICY,
          AssetName.ASSET_NAME_1
        );
        let assetHistoryYaci = await (
          await yaciService()
        ).getAssetHistoryByUnit(unit);

        await test.step("THEN: Compare the asset history", async () => {
          Assertions.assertNotEqual(
            assetHistoryKoios,
            assetHistoryYaci,
            "Asset history should be similar."
          );
        });
      });
    });
  });
});
