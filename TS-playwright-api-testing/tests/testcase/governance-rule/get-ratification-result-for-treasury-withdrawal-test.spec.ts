import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciGovernanceRuleService } from "@api-common/service/yaci-governance-rule-service/yaci-governance-rule.service";
import { test } from "@playwright/test";

test.describe("@regression @governance-rule", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check get gov ratification result for treasury withdrawal", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for treasury withdrawal", async () => {
      let treasuryWithdrawal = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForTreasuryWithdrawalsAction();

      await test.step("THEN:gov ratification result for treasury withdrawal should not be null", () => {
        Assertions.assertNotNull(
          treasuryWithdrawal,
          "gov ratification result for treasury withdrawal should not be null."
        );
      });
    });
  });
});
