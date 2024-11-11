import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @utxo", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("the transaction processor in Yaci", async ({}) => {
    test.step("GIVEN: create a transaction with utxo", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (
        await yaciService()
      ).submitUtxo(StakeAddresses.STAKE_ADDRESS_1, randomNumber);

      await test.step("THEN: Verify field are not null", () => {
        transaction.forEach((transactionDto) => {
          Assertions.assertNotNull(
            transactionDto.block_number,
            "block_number should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.block_time,
            "block_time should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.tx_hash,
            "tx_hash should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.output_index,
            "output_index should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.slot,
            "slot should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.block_hash,
            "block_hash should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.epoch,
            "epoch should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.owner_addr,
            "owner_addr should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.owner_stake_addr,
            "owner_stake_addr should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.owner_payment_credential,
            "owner_payment_credential should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.owner_stake_credential,
            "owner_stake_credential should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.lovelace_amount,
            "lovelace_amount should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.amounts,
            "amounts should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.data_hash,
            "data_hash should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.inline_datum,
            "inline_datum should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.script_ref,
            "script_ref should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.reference_script_hash,
            "reference_script_hash should not be null"
          );
          Assertions.assertNotNull(
            transactionDto.is_collateral_return,
            "is_collateral_return should not be null"
          );
        });
      });
    });
  });
});
