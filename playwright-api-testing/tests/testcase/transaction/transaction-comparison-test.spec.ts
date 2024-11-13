import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @transaction", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the transaction of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: Retrieve transaction information", async () => {
      let transactionKoios = await (
        await koiosService()
      ).getAccountTransaction(StakeAddresses.STAKE_ADDRESS_1);
      let transactionYaci = await (await yaciService()).getTransaction();

      await test.step("THEN: Compare transaction information", () => {
        Assertions.assertEqual(
          transactionKoios,
          transactionYaci,
          "Transaction should be equal."
        );
      });
    });
  });
});
