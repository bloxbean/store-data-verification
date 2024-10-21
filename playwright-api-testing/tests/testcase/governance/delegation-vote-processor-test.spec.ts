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

  test("Check the logic of process a new delegation vote", async ({}) => {
    test.step("GIVEN: Retrieve delegation vote", async () => {
      let delegationVote = await (await yaciService()).getDelegationVotes();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve delegation vote after wait", async () => {
        let delegationVoteAfterWait = await (await yaciService()).getDelegationVotes();

        await test.step("THEN: delegation vote should be different after wait ", () => {
          Assertions.assertNotEqual(delegationVote, delegationVoteAfterWait, "Delegation vote should be different.");
        });
      });
    });
  });
});
