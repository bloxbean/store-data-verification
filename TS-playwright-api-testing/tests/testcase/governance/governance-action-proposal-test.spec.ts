import { TimeOut } from "@api-common/constants/project.constants";
import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @governance", () => {
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

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) =>
          setTimeout(resolve, TimeOut.FIVE_SECONDS)
        ); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve governance action proposal after wait", async () => {
        let governanceActionProposalsAfterWait = await (
          await yaciService()
        ).getDrepRegistrations();

        await test.step("THEN: governance action proposal should be different after wait ", () => {
          Assertions.assertNotEqual(
            governanceActionProposals,
            governanceActionProposalsAfterWait,
            "Governance action proposal should be different."
          );
        });
      });
    });
  });
});
