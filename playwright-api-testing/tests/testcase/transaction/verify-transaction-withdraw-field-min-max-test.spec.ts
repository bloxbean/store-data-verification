import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @transaction", () => {
  test("the withdraw processor in Yaci", async ({}) => {
    test.step("GIVEN: get detail withdraws", async () => {
      let detailWithdrawals = await (await yaciService()).getDetailWithdrawals(StakeAddresses.STAKE_ADDRESS_1);

      await test.step("WHEN: Verify fields in transaction information", async () => {
        let fields = [
          {
            name: "block_number",
            values: detailWithdrawals.map((detailWithdrawalsDto) => detailWithdrawalsDto.block_number),
          },
          {
            name: "block_time",
            values: detailWithdrawals.map((detailWithdrawalsDto) => detailWithdrawalsDto.block_time),
          },
          { name: "amount", values: detailWithdrawals.map((detailWithdrawalsDto) => detailWithdrawalsDto.amount) },
          { name: "epoch", values: detailWithdrawals.map((detailWithdrawalsDto) => detailWithdrawalsDto.epoch) },
          { name: "slot", values: detailWithdrawals.map((detailWithdrawalsDto) => detailWithdrawalsDto.slot) },
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
