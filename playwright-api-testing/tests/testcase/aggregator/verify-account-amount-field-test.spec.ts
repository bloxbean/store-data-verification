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

        await test.step("AND: Retrieve address amount field", async () => {
          let quantity = addressAmount.map((addressAmountDto) => addressAmountDto.quantity);
          let unit = addressAmount.map((addressAmountDto) => addressAmountDto.unit);

          await test.step("THEN: Verify address field amount is not null", async () => {
            Assertions.assertNotNull(quantity, "address amount quantity should not be null");
            Assertions.assertNotNull(unit, "address amount unit should not be null");
          });
        });
      });
    });
  });
});
