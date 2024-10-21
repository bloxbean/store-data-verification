import { TimeOut } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of process a governance committee registration", async ({}) => {
    test.step("GIVEN: Retrieve governance committee registration", async () => {
      let governanceCommitteeRegistration = await (await yaciService()).getGovernanceCommitteesRegistration();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve governance committee registration after wait", async () => {
        let governanceCommitteeRegistrationAfterWait = await (
          await yaciService()
        ).getGovernanceCommitteesRegistration();

        await test.step("THEN: governance committee registration should be different after wait ", () => {
          Assertions.assertNotEqual(
            governanceCommitteeRegistration,
            governanceCommitteeRegistrationAfterWait,
            "Governance committee registration should be different."
          );
        });
      });
    });
  });
});
