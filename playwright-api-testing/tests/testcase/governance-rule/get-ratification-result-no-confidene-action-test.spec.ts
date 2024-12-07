import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciGovernanceRuleService } from "@common/service/yaci-governance-rule-service/yaci-governance-rule.service";
import { test } from "@playwright/test";

test.describe("@regression @governance-rule", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check get gov ratification result for no confidence action", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for no confidence action", async () => {
      let noConfidenceAction = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForNoConfidenceAction();

      await test.step("THEN:gov ratification result for no confidence action should not be null", () => {
        Assertions.assertNotNull(
          noConfidenceAction,
          "gov ratification result for no confidence action should not be null."
        );
      });
    });
  });
});
