import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the field of", async ({}) => {
    test.step("GIVEN: Retrieve committee information", async () => {
      let committeeInformation = await (
        await yaciService()
      ).getCurrentCommitteeInfo();

      await test.step("WHEN: get committee field information", async () => {
        let fields = [
          {
            name: "hash",
            values: committeeInformation.map(
              (committeeInformationDto) => committeeInformationDto.hash
            ),
          },
          {
            name: "start_epoch",
            values: committeeInformation.map(
              (committeeInformationDto) => committeeInformationDto.start_epoch
            ),
          },
          {
            name: "expired_epoch",
            values: committeeInformation.map(
              (committeeInformationDto) => committeeInformationDto.expired_epoch
            ),
          },
        ];

        fields.forEach(async (field) => {
          let minValue = Math.min(...field.values);
          let maxValue = Math.max(...field.values);

          await test.step(`THEN: Verify ${field.name} min and max values are not equal`, () => {
            Assertions.assertNotEqual(
              minValue,
              maxValue,
              `${field.name} min and max values should not be equal`
            );
          });
        });
      });
    });
  });
});
