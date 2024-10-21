import { TxHashes } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @asset", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Compare the asset history of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: get detail unit information", async () => {
      let detailTransaction = await (await yaciService()).getDetailTransaction(TxHashes.TX_HASHES_1);

      await test.step("WHEN: get min and max value of all field", async () => {
        let block_number = detailTransaction.map((detailTransactionDto) => detailTransactionDto.block_number);
        let block_time = detailTransaction.map((detailTransactionDto) => detailTransactionDto.block_time);
        let output_index = detailTransaction.map((detailTransactionDto) => detailTransactionDto.output_index);
        let slot = detailTransaction.map((detailTransactionDto) => detailTransactionDto.slot);
        let epoch = detailTransaction.map((detailTransactionDto) => detailTransactionDto.epoch);
        let lovelace_amount = detailTransaction.map((detailTransactionDto) => detailTransactionDto.lovelace_amount);
        let amount = detailTransaction.map((detailTransactionDto) => detailTransactionDto.amount);

        await test.step("THEN: Verify all the field is not null", async () => {
          Assertions.assertNotNull(block_number, "field should not be null");
          Assertions.assertNotNull(block_time, "field should not be null");
          Assertions.assertNotNull(output_index, "field should not be null");
          Assertions.assertNotNull(slot, "field should not be null");
          Assertions.assertNotNull(epoch, "field should not be null");
          Assertions.assertNotNull(lovelace_amount, "field should not be null");
          Assertions.assertNotNull(amount, "field should not be null");
        });
      });
    });
  });
});
