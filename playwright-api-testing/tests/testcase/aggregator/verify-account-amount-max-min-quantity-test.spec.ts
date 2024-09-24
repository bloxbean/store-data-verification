import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { yaciAggregatorService } from "@common/service/yaci_aggregator_api_service/yaci-aggregator.service";
import { test } from "@playwright/test";

test.describe("@regression @account", () => {
  test("Check the account amount fielda not null", async ({}) => {
    test.step("GIVEN: Retrieve address", async () => {
      let address = await (await yaciService()).getAddressFromStakeRegistrations();

      await test.step("WHEN: Retrieve address amount", async () => {
        let addressAmount = await (await yaciAggregatorService()).getAddressAmounts(address);

        await test.step("AND: Retrieve max and min quantity field", async () => {
          let quantity = addressAmount.map((addressAmountDto) => addressAmountDto.quantity);
          let minQuantity: number = quantity[0];
          let maxQuantity: number = Math.max(...quantity);

          await test.step("THEN: Verify max and min quantity are not equal", async () => {
            Assertions.assertNotEqual(minQuantity, maxQuantity, "min and max value should not be equal");
          });
        });
      });
    });
  });
});
