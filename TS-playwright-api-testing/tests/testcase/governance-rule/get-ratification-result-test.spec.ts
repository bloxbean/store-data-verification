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

  test("Check get gov ratification result", async ({}) => {
    test.step("GIVEN: Retrieve gov ratification result", async () => {
      let govRatificationResult = await (
        await yaciGovernanceRuleService()
      ).getRatificationResult();

      await test.step("THEN:gov ratification result should not be null", () => {
        Assertions.assertNotNull(
          govRatificationResult,
          "gov ratification result should not be null."
        );
      });
    });
  });
});
