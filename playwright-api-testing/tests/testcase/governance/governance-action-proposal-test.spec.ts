import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";

test.describe("@governance", () => {
  test("Check the logic of process a governance action proposal", async ({}) => {
    test.step("GIVEN: Retrieve governance action proposal", async () => {
      let governanceActionProposals = await (await yaciService()).getGovernanceActionProposals();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve governance action proposal after wait", async () => {
        let governanceActionProposalsAfterWait = await (await yaciService()).getDrepRegistrations();

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
