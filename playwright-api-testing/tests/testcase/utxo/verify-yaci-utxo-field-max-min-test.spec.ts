import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @utxo", () => {
  test("the transaction processor in Yaci", async ({}) => {
    test.step("GIVEN: create a transaction with utxo", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let transaction = await (await yaciService()).submitUtxo(StakeAddresses.STAKE_ADDRESS_1, randomNumber);

      test.step("WHEN: Retrieve transaction information", async () => {
        const fields = [
          { name: "block_number", values: transaction.map((transactionYaciDto) => transactionYaciDto.block_number) },
          { name: "block_time", values: transaction.map((transactionYaciDto) => transactionYaciDto.block_time) },
          { name: "output_index", values: transaction.map((transactionYaciDto) => transactionYaciDto.output_index) },
          { name: "slot", values: transaction.map((transactionYaciDto) => transactionYaciDto.slot) },
          {
            name: "lovelace_amount",
            values: transaction.map((transactionYaciDto) => transactionYaciDto.lovelace_amount),
          },
        ];

        fields.forEach((field) => {
          const minValue = Math.min(...field.values);
          const maxValue = Math.max(...field.values);

          test.step(`THEN: Verify ${field.name} min and max values are not equal`, () => {
            Assertions.assertNotEqual(minValue, maxValue, `${field.name} min and max values should not be equal`);
          });
        });
      });
    });
  });
});
