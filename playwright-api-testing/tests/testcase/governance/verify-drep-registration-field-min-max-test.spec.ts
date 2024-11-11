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

  test("Check the logic of process a drep registration", async ({}) => {
    test.step("GIVEN: Retrieve drep registration", async () => {
      let drepRegistration = await (await yaciService()).getDrepRegistrations();

      await test.step("WHEN: get drep registration field ", () => {
        let fields = [
          {
            name: "block_number",
            values: drepRegistration.map(
              (drepRegistrationDto) => drepRegistrationDto.block_number
            ),
          },
          {
            name: "block_time",
            values: drepRegistration.map(
              (drepRegistrationDto) => drepRegistrationDto.block_time
            ),
          },
          {
            name: "cert_index",
            values: drepRegistration.map(
              (drepRegistrationDto) => drepRegistrationDto.cert_index
            ),
          },
          {
            name: "slot",
            values: drepRegistration.map(
              (drepRegistrationDto) => drepRegistrationDto.slot
            ),
          },
          {
            name: "deposit",
            values: drepRegistration.map(
              (drepRegistrationDto) => drepRegistrationDto.deposit
            ),
          },
          {
            name: "epoch",
            values: drepRegistration.map(
              (drepRegistrationDto) => drepRegistrationDto.epoch
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
