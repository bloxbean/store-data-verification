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

  test("Verify the value of field in yaci", async ({}) => {
    test.step("GIVEN: Retrieve transaction information", async () => {
      let transactionYaci = await (await yaciService()).getTransaction();

      await test.step(`THEN: Verify fields in transaction are not null`, () => {
        transactionYaci.forEach((transactionYaciDto) => {
          Assertions.assertNotNull(
            transactionYaciDto.tx_hash,
            "tx_hash should not be null"
          );
          Assertions.assertNotNull(
            transactionYaciDto.block_number,
            "block_number should not be null"
          );
          Assertions.assertNotNull(
            transactionYaciDto.slot,
            "slot should not be null"
          );
          Assertions.assertNotNull(
            transactionYaciDto.output_addresses,
            "output_addresses should not be null"
          );
          Assertions.assertNotNull(
            transactionYaciDto.total_output,
            "total_output should not be null"
          );
          Assertions.assertNotNull(
            transactionYaciDto.fee,
            "fee should not be null"
          );
        });
      });
    });
  });
});
