import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciAggregatorService } from "@common/service/yaci_aggregator_api_service/yaciAggregator.service";
import { yaciService } from "@common/service/yaci_api_service/yaci.service";

test.describe("@account", () => {
  test("Check the account amount is not null", async ({}) => {
    test.step("GIVEN: Retrieve address", async () => {
      let address = await (await yaciService()).getAddressFromStakeRegistrations();

      await test.step("WHEN: Retrieve address amount", async () => {
        let addressAmount = await (await yaciAggregatorService()).getAddressAmounts(address);

        await test.step("THEN: Verify address amount is not null", async () => {
          Assertions.assertNotNull(addressAmount, "address amount should not be null");
        });
      });
    });
  });
});
