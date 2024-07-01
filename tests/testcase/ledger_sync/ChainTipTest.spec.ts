import { test, expect } from "@playwright/test";
import { BackendFactory } from "@adabox/koios-ts-client";
import { PostgreSQL } from "@helpers/database/database.helper";
import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";

test.describe("@smoke", () => {
  test("Compare the tip of Koios and Ledger Sync", async ({}) => {
    const koiosBackendService = BackendFactory.getKoiosMainnetService();
    const koiosNetworkService = koiosBackendService.getNetworkService();
    test.step("STEP 1: Retrieve chain tip", async () => {
      const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME, DatabaseConstants.BLOCK_TABLE);
      let chainTipLS = await postgres.findBlockHeight();
      let chainTipKoios = await koiosNetworkService.getChainTip();

      await test.step("VP: Compare chain tip", () => {
        Assertions.assertEqual(chainTipLS, chainTipKoios, "Chain tips should be equal.");
      });

      await test.step("STEP 2: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
      });

      await test.step("STEP 3: Retrieve chain tip again", async () => {
        let chainTipLSAfterWait = await postgres.findBlockHeight();
        let chainTipKoiosAfterWait = await koiosNetworkService.getChainTip();

        await test.step("VP: Compare chain tip again", () => {
          Assertions.assertEqual(
            chainTipLSAfterWait,
            chainTipKoiosAfterWait,
            "Chain tips should be equal after waiting."
          );
        });

        await test.step("VP: Assert the chain tip sync after a period of time", () => {
          Assertions.assertNotEqual(
            String(chainTipLS),
            String(chainTipKoiosAfterWait),
            "Chain tips should not be equal after waiting."
          );
          Assertions.assertNotEqual(
            String(chainTipKoios),
            String(chainTipLSAfterWait),
            "Chain tips should not be equal after waiting."
          );
        });
      });
    });
  });
});
