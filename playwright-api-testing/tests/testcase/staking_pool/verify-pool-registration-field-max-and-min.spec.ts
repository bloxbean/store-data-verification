import { Assertions } from "@common/helpers/misc/assertions.helper";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @pool", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the pool registration information in Yaci and Koios", async ({}) => {
    test.step("GIVEN: Retrieve pool information", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 999);
      let poolInformationYaci = await (await yaciService()).getPoolRegistration(randomNumber);

      await test.step("WHEN: Retrieve pool field information", async () => {
        let fields = [
          {
            name: "block_number",
            values: poolInformationYaci.map((poolInformationYaciDto) => poolInformationYaciDto.block_number),
          },
          {
            name: "block_time",
            values: poolInformationYaci.map((poolInformationYaciDto) => poolInformationYaciDto.block_time),
          },
          {
            name: "cert_index",
            values: poolInformationYaci.map((poolInformationYaciDto) => poolInformationYaciDto.cert_index),
          },
          {
            name: "pledge",
            values: poolInformationYaci.map((poolInformationYaciDto) => poolInformationYaciDto.pledge),
          },
          { name: "cost", values: poolInformationYaci.map((poolInformationYaciDto) => poolInformationYaciDto.cost) },
          {
            name: "margin",
            values: poolInformationYaci.map((poolInformationYaciDto) => poolInformationYaciDto.margin),
          },
          { name: "epoch", values: poolInformationYaci.map((poolInformationYaciDto) => poolInformationYaciDto.epoch) },
          { name: "slot", values: poolInformationYaci.map((poolInformationYaciDto) => poolInformationYaciDto.slot) },
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
