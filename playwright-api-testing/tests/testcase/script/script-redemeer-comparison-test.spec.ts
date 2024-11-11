import { ScriptHash, TxHashes } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @script", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the script redeemer of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: Retrieve script redeemer information", async () => {
      let scriptRedeemerKoios = await (
        await koiosService()
      ).getScriptRedeemers(ScriptHash.SCRIPT_HASH_1);
      let scriptRedeemerYaci = await (
        await yaciService()
      ).getScript(TxHashes.TX_HASHES_3);

      await test.step("THEN: fetch script hash", () => {
        Assertions.assertEqual(
          scriptRedeemerKoios,
          scriptRedeemerYaci,
          "Script redeemer should be equal."
        );
      });
    });
  });
});
