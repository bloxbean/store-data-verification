import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciAggregatorService } from "@common/service/yaci_aggregator_api_service/yaci-aggregator.service";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";

test.describe("@account", () => {
  test("Check the account amount is lovelace or not", async ({}) => {
    test.step("GIVEN: Retrieve address", async () => {
      let address = await (await yaciService()).getAddressFromStakeRegistrations();

      await test.step("WHEN: Retrieve address balance", async () => {
        let addressBalance = await (await yaciAggregatorService()).getAddressBalance(address);

        await test.step("THEN: Verify address amount is not null", async () => {
          Assertions.assertNotNull(addressBalance, "address amount should not be null");
        });
      });
    });
  });
});
