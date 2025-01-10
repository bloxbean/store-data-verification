import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciAggregatorService } from "@api-common/service/yaci-aggregator-api-service/yaci-aggregator.service";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @account", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the account amount is not null", async ({}) => {
    test.step("GIVEN: Retrieve address", async () => {
      let address = await (
        await yaciService()
      ).getAddressFromStakeRegistrations();

      await test.step("WHEN: Retrieve address amount", async () => {
        let addressAmount = await (
          await yaciAggregatorService()
        ).getAddressAmounts(address);

        await test.step("THEN: Verify address amount is not null", async () => {
          Assertions.assertNotNull(
            addressAmount,
            "address amount should not be null"
          );
        });
      });
    });
  });
});
