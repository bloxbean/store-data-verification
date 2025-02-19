import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression  @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of process a governance action proposal", async ({}) => {
    test.step("GIVEN: Retrieve governance action proposal", async () => {
      let governanceActionProposals = await (
        await yaciService()
      ).getGovernanceActionProposals();

      await test.step("THEN: governance action proposal should not be null ", () => {
        let fields = [
          {
            name: "block_number",
            values: governanceActionProposals.map(
              (governanceActionProposalsDto) =>
                governanceActionProposalsDto.block_number
            ),
          },
          {
            name: "block_time",
            values: governanceActionProposals.map(
              (governanceActionProposalsDto) =>
                governanceActionProposalsDto.block_time
            ),
          },
          {
            name: "index",
            values: governanceActionProposals.map(
              (governanceActionProposalsDto) =>
                governanceActionProposalsDto.index
            ),
          },
          {
            name: "slot",
            values: governanceActionProposals.map(
              (governanceActionProposalsDto) =>
                governanceActionProposalsDto.slot
            ),
          },
          {
            name: "deposit",
            values: governanceActionProposals.map(
              (governanceActionProposalsDto) =>
                governanceActionProposalsDto.deposit
            ),
          },
          {
            name: "epoch",
            values: governanceActionProposals.map(
              (governanceActionProposalsDto) =>
                governanceActionProposalsDto.epoch
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
