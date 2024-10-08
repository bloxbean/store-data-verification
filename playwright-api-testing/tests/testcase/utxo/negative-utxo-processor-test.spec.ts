import { Empty, Null, StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @utxo", () => {
  test("the transaction processor in Yaci if error happens", async ({}) => {
    test.step("GIVEN: create a transaction with utxo", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (await yaciService()).submitUtxo(StakeAddresses.FAULT_STAKE_ADDRESS, randomNumber);

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

test("the transaction processor in Yaci if error happens -2", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (await yaciService()).submitUtxo(Empty.EMPTY, randomNumber);

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

test("the transaction processor in Yaci if error happens -3", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (await yaciService()).submitUtxo(Null.NULL, randomNumber);

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

test("the transaction processor in Yaci if error happens -4", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (await yaciService()).submitUtxo(Null.NULL, randomNumber);

    await test.step("THEN: Transaction should be null", () => {
      Assertions.assertNull(transaction, "detail transaction should not contain transaction information.");
    });
  });
});

test("the transaction processor in Yaci if error happens -5", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (await yaciService()).submitUtxo(Empty.EMPTY, randomNumber);

    await test.step("THEN: Transaction should be null", () => {
      Assertions.assertNull(transaction, "detail transaction should not contain transaction information.");
    });
  });
});

test("the transaction processor in Yaci if error happens -6", async ({}) => {
  test.step("GIVEN: create a transaction with utxo", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (await yaciService()).submitUtxo(StakeAddresses.FAULT_STAKE_ADDRESS, randomNumber);

    await test.step("THEN: Transaction should be null", () => {
      Assertions.assertNull(transaction, "detail transaction should not contain transaction information.");
    });
  });
});
