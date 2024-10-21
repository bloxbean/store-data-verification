import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @utxo", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("the transaction processor in Yaci", async ({}) => {
    test.step("GIVEN: create a transaction with utxo", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (await yaciService()).submitUtxo(StakeAddresses.STAKE_ADDRESS_1, randomNumber);

      await test.step("WHEN: get detail transaction", async () => {
        let detailTransaction = await (await yaciService()).getDetailTransaction(StakeAddresses.STAKE_ADDRESS_1);

        await test.step("THEN: Compare transaction information", () => {
          Assertions.assertJsonContain(
            detailTransaction,
            transaction,
            "detail transaction should contain transaction information."
          );
        });
      });
    });
  });
});

test.describe("@utxo", () => {
  test("the transaction processor in Yaci if error happens", async ({}) => {
    test.step("GIVEN: create a transaction with utxo", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (await yaciService()).submitUtxo(StakeAddresses.STAKE_ADDRESS_2, randomNumber);

      await test.step("WHEN: get detail transaction", async () => {
        let detailTransaction = await (await yaciService()).getDetailTransaction(StakeAddresses.STAKE_ADDRESS_1);

        await test.step("THEN: Compare transaction information", () => {
          Assertions.assertNotJsonContain(
            detailTransaction,
            transaction,
            "detail transaction should not contain transaction information."
          );
        });
      });
    });
  });
});
