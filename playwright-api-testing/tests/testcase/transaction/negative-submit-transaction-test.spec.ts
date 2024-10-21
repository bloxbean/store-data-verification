import { Empty, Null, StakeAddresses } from "@common/constants/project.constants";
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

  test("the transaction processor in Yaci if error happen -1", async ({}) => {
    test.step("GIVEN: create a faulty transaction", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (await yaciService()).submitTransaction(StakeAddresses.FAULT_STAKE_ADDRESS, randomNumber);

      await test.step("THEN: verify transaction is null", () => {
        Assertions.assertNull(transaction, "detail transaction should be null.");
      });
    });
  });
});

test("the transaction processor in Yaci if error happen -2", async ({}) => {
  test.step("GIVEN: create a faulty transaction", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (await yaciService()).submitTransaction(Empty.EMPTY, randomNumber);

    await test.step("THEN: verify transaction is null", () => {
      Assertions.assertNull(transaction, "detail transaction should be null.");
    });
  });
});

test("the transaction processor in Yaci if error happen -3", async ({}) => {
  test.step("GIVEN: create a faulty transaction", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (await yaciService()).submitTransaction(Null.NULL, randomNumber);

    await test.step("THEN: verify transaction is null", () => {
      Assertions.assertNull(transaction, "detail transaction should be null.");
    });
  });
});
