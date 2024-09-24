import { TxHashes } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @asset", () => {
  test("Verify min and max value of asset history in Yaci Store", async ({}) => {
    test.step("GIVEN: get detail unit information", async () => {
      let detailTransaction = await (await yaciService()).getDetailTransaction(TxHashes.TX_HASHES_1);

      await test.step("WHEN: get min and max value of all field", async () => {
        let block_number = detailTransaction.map((detailTransactionDto) => detailTransactionDto.block_number);
        let minBlockNumber: number = block_number[0];
        let maxBlockNumber: number = Math.max(...block_number);

        let block_time = detailTransaction.map((detailTransactionDto) => detailTransactionDto.block_time);
        let minBlockTime: number = block_time[0];
        let maxBlockTime: number = Math.max(...block_time);

        let output_index = detailTransaction.map((detailTransactionDto) => detailTransactionDto.output_index);
        let minOutputIndex: number = output_index[0];
        let maxOutputIndex: number = Math.max(...output_index);

        let slot = detailTransaction.map((detailTransactionDto) => detailTransactionDto.slot);
        let minSlot: number = slot[0];
        let maxSlot: number = Math.max(...slot);

        let epoch = detailTransaction.map((detailTransactionDto) => detailTransactionDto.epoch);
        let minEpoch: number = epoch[0];
        let maxEpoch: number = Math.max(...epoch);

        let lovelace_amount = detailTransaction.map((detailTransactionDto) => detailTransactionDto.lovelace_amount);
        let minLovelaceAmount: number = lovelace_amount[0];
        let maxLovelaceAmount: number = Math.max(...lovelace_amount);

        await test.step("THEN: Verify all the field is not null", async () => {
          Assertions.assertNotEqual(minBlockNumber, maxBlockNumber, "min and max value should not be equal");
          Assertions.assertNotEqual(minBlockTime, maxBlockTime, "min and max value should not be equal");
          Assertions.assertNotEqual(minSlot, maxSlot, "min and max value should not be equal");
          Assertions.assertNotEqual(minOutputIndex, maxOutputIndex, "min and max value should not be equal");
          Assertions.assertNotEqual(minEpoch, maxEpoch, "min and max value should not be equal");
          Assertions.assertNotEqual(minLovelaceAmount, maxLovelaceAmount, "min and max value should not be equal");
        });
      });
    });
  });
});
