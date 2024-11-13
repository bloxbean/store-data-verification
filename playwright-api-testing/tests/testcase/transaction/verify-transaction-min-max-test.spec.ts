import { Assertions } from "@common/helpers/misc/assertions.helper";
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

  test("Verify the value of field in yaci", async ({}) => {
    test.step("GIVEN: Retrieve transaction information", async () => {
      let transactionYaci = await (await yaciService()).getTransaction();

      await test.step("WHEN: Get field information", () => {
        let fields = [
          {
            name: "block_number",
            values: transactionYaci.map((transactionYaciDto) => transactionYaciDto.block_number),
          },
          {
            name: "total_output",
            values: transactionYaci.map((transactionYaciDto) => transactionYaciDto.total_output),
          },
          { name: "fee", values: transactionYaci.map((transactionYaciDto) => transactionYaciDto.fee) },
          { name: "slot", values: transactionYaci.map((transactionYaciDto) => transactionYaciDto.slot) },
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
