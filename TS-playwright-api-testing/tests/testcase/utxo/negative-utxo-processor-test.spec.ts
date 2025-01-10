import {
  Empty,
  Null,
  StakeAddresses,
} from "@api-common/constants/project.constants";
import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { DataGenerator } from "@api-common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @utxo", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("the transaction processor in Yaci if error happens", async ({}) => {
    test.step("GIVEN: create a transaction with utxo", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (
        await yaciService()
      ).submitUtxo(StakeAddresses.FAULT_STAKE_ADDRESS, randomNumber);

      await test.step("WHEN: get detail transaction", async () => {
        let detailTransaction = await (
          await yaciService()
        ).getDetailTransaction(StakeAddresses.STAKE_ADDRESS_1);

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

test("the transaction processor in Yaci if error happens -2", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (
      await yaciService()
    ).submitUtxo(Empty.EMPTY, randomNumber);

    await test.step("WHEN: get detail transaction", async () => {
      let detailTransaction = await (
        await yaciService()
      ).getDetailTransaction(StakeAddresses.STAKE_ADDRESS_1);

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

test("the transaction processor in Yaci if error happens -3", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (
      await yaciService()
    ).submitUtxo(Null.NULL, randomNumber);

    await test.step("WHEN: get detail transaction", async () => {
      let detailTransaction = await (
        await yaciService()
      ).getDetailTransaction(StakeAddresses.STAKE_ADDRESS_1);

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

test("the transaction processor in Yaci if error happens -4", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (
      await yaciService()
    ).submitUtxo(Null.NULL, randomNumber);

    await test.step("THEN: Transaction should be null", () => {
      Assertions.assertNull(
        transaction,
        "detail transaction should not contain transaction information."
      );
    });
  });
});

test("the transaction processor in Yaci if error happens -5", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (
      await yaciService()
    ).submitUtxo(Empty.EMPTY, randomNumber);

    await test.step("THEN: Transaction should be null", () => {
      Assertions.assertNull(
        transaction,
        "detail transaction should not contain transaction information."
      );
    });
  });
});

test("the transaction processor in Yaci if error happens -6", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (
      await yaciService()
    ).submitUtxo(StakeAddresses.FAULT_STAKE_ADDRESS, randomNumber);

    await test.step("THEN: Transaction should be null", () => {
      Assertions.assertNull(
        transaction,
        "detail transaction should not contain transaction information."
      );
    });
  });
});
