import { StakeAddresses } from "@api-common/constants/project.constants";
import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @transaction", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("the withdraw processor in Yaci", async ({}) => {
    test.step("GIVEN: get detail withdraws", async () => {
      let detailWithdrawals = await (
        await yaciService()
      ).getDetailWithdrawals(StakeAddresses.STAKE_ADDRESS_1);

      await test.step("THEN: Verify fields in transaction information", () => {
        detailWithdrawals.forEach((detailWithdrawalsDto) => {
          Assertions.assertNotNull(
            detailWithdrawalsDto.block_number,
            "block_number should not be null"
          );
          Assertions.assertNotNull(
            detailWithdrawalsDto.block_time,
            "block_time should not be null"
          );
          Assertions.assertNotNull(
            detailWithdrawalsDto.address,
            "address should not be null"
          );
          Assertions.assertNotNull(
            detailWithdrawalsDto.tx_hash,
            "tx_hash should not be null"
          );
          Assertions.assertNotNull(
            detailWithdrawalsDto.amount,
            "amount should not be null"
          );
          Assertions.assertNotNull(
            detailWithdrawalsDto.epoch,
            "epoch should not be null"
          );
          Assertions.assertNotNull(
            detailWithdrawalsDto.slot,
            "slot should not be null"
          );
        });
      });
    });
  });
});
