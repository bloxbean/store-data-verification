import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @transaction", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("the withdraw processor in Yaci", async ({}) => {
    test.step("GIVEN: get submit transaction", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (await yaciService()).submitTransaction(StakeAddresses.STAKE_ADDRESS_1, randomNumber);

      await test.step("WHEN: get fields details in transaction information", () => {
        let fields = [
          { name: "block_number", values: transaction.map((transactionDto) => transactionDto.block_number) },
          { name: "block_time", values: transaction.map((transactionDto) => transactionDto.block_time) },
          { name: "output_index", values: transaction.map((transactionDto) => transactionDto.output_index) },
          { name: "slot", values: transaction.map((transactionDto) => transactionDto.slot) },
          { name: "epoch", values: transaction.map((transactionDto) => transactionDto.epoch) },
          { name: "lovelace_amount", values: transaction.map((transactionDto) => transactionDto.lovelace_amount) },
        ];

        fields.forEach(async (field) => {
          let minValue = Math.min(...field.values);
          let maxValue = Math.max(...field.values);

          await test.step(`THEN: Verify ${field.name} min and max values are not equal`, () => {
            Assertions.assertNotEqual(minValue, maxValue, `${field.name} min and max values should not be equal`);
          });
        });
      });
    });
  });
});
