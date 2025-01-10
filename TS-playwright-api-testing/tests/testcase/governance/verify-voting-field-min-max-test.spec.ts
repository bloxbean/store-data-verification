import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of process of voting", async ({}) => {
    test.step("GIVEN: Retrieve vote information", async () => {
      let votesInformation = await (await yaciService()).getVotingProcedure();

      await test.step("WHEN: retreive field information ", () => {
        let fields = [
          {
            name: "block_number",
            values: votesInformation.map(
              (votesInformationDto) => votesInformationDto.block_number
            ),
          },
          {
            name: "block_time",
            values: votesInformation.map(
              (votesInformationDto) => votesInformationDto.block_time
            ),
          },
          {
            name: "index",
            values: votesInformation.map(
              (votesInformationDto) => votesInformationDto.index
            ),
          },
          {
            name: "slot",
            values: votesInformation.map(
              (votesInformationDto) => votesInformationDto.slot
            ),
          },
          {
            name: "epoch",
            values: votesInformation.map(
              (votesInformationDto) => votesInformationDto.epoch
            ),
          },
          {
            name: "gov_action_index",
            values: votesInformation.map(
              (votesInformationDto) => votesInformationDto.gov_action_index
            ),
          },
          {
            name: "vote",
            values: votesInformation.map(
              (votesInformationDto) => votesInformationDto.vote
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
