import { test, expect } from "@playwright/test";
import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";

test.describe("@transaction", () => {
  test("the transaction processor in Yaci", async ({}) => {
    test.step("GIVEN: create a transaction", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (await yaciService()).submitTransaction(StakeAddresses.STAKE_ADDRESS_1, randomNumber);

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

test("the transaction processor in Yaci if error happen", async ({}) => {
  test.step("GIVEN: create a transaction", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let transaction = await (await yaciService()).submitTransaction(StakeAddresses.STAKE_ADDRESS_2, randomNumber);

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
