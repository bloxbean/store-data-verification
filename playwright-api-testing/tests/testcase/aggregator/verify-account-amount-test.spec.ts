import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { yaciAggregatorService } from "@common/service/yaci_aggregator_api_service/yaci-aggregator.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @account", () => {
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
