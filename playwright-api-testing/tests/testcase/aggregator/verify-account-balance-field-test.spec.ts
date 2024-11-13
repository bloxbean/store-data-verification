import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { yaciAggregatorService } from "@common/service/yaci_aggregator_api_service/yaci-aggregator.service";
import { test } from "@playwright/test";

test.describe("@regression @account", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the account amount is lovelace or not", async ({}) => {
    test.step("GIVEN: Retrieve address", async () => {
      let address = await (
        await yaciService()
      ).getAddressFromStakeRegistrations();

      await test.step("WHEN: Retrieve address balance", async () => {
        let addressBalance = await (
          await yaciAggregatorService()
        ).getAddressBalance(address);

        await test.step("AND: Retrieve address amount field", async () => {
          let address = addressBalance.map(
            (addressBalanceDto) => addressBalanceDto.address
          );
          let block_number = addressBalance.map(
            (addressBalanceDto) => addressBalanceDto.block_number
          );
          let block_time = addressBalance.map(
            (addressBalanceDto) => addressBalanceDto.block_time
          );
          let slot = addressBalance.map(
            (addressBalanceDto) => addressBalanceDto.slot
          );
          let last_balance_calculation_block = addressBalance.map(
            (addressBalanceDto) =>
              addressBalanceDto.last_balance_calculation_block
          );

          await test.step("THEN: Verify address amount field is not null", async () => {
            Assertions.assertNotNull(
              address,
              "address amount field should not be null"
            );
            Assertions.assertNotNull(
              block_number,
              "address amount field should not be null"
            );
            Assertions.assertNotNull(
              block_time,
              "address amount field should not be null"
            );
            Assertions.assertNotNull(
              slot,
              "address amount field should not be null"
            );
            Assertions.assertNotNull(
              address,
              "address amount field should not be null"
            );
            Assertions.assertNotNull(
              last_balance_calculation_block,
              "address amount field should not be null"
            );
          });
        });
      });
    });
  });
});
