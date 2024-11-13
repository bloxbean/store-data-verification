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
      let address = await (await yaciService()).getAddressFromStakeRegistrations();

      await test.step("WHEN: Retrieve address balance", async () => {
        let addressBalance = await (await yaciAggregatorService()).getAddressBalance(address);

        await test.step("AND: Retrieve min and max value of address amount field", async () => {
          let block_number = addressBalance.map((addressBalanceDto) => addressBalanceDto.block_number);
          let minBlockNumber: number = block_number[0];
          let maxBlockNumber: number = Math.max(...block_number);

          let block_time = addressBalance.map((addressBalanceDto) => addressBalanceDto.block_time);
          let minBlockTime: number = block_time[0];
          let maxBlockTime: number = Math.max(...block_time);

          let slot = addressBalance.map((addressBalanceDto) => addressBalanceDto.slot);
          let minSlot: number = slot[0];
          let maxSlot: number = Math.max(...slot);

          let last_balance_calculation_block = addressBalance.map(
            (addressBalanceDto) => addressBalanceDto.last_balance_calculation_block
          );
          let minBalanceCalculationBlock: number = last_balance_calculation_block[0];
          let maxBalanceCalculationBlock: number = Math.max(...last_balance_calculation_block);

          await test.step("THEN: Verify address amount field is not null", async () => {
            Assertions.assertNotEqual(minBlockNumber, maxBlockNumber, "min and max value should not be equal");
            Assertions.assertNotEqual(minBlockTime, maxBlockTime, "min and max value should not be equal");
            Assertions.assertNotEqual(minSlot, maxSlot, "min and max value should not be equal");
            Assertions.assertNotEqual(
              minBalanceCalculationBlock,
              maxBalanceCalculationBlock,
              "min and max value should not be equal"
            );
          });
        });
      });
    });
  });
});
