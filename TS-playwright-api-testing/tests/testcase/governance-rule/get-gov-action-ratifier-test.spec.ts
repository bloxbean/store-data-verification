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

  test("Check get gov action ratifier", async ({}) => {
    test.step("GIVEN: Retrieve gov action ratifier", async () => {
      let govActionRatifier = await (
        await yaciGovernanceRuleService()
      ).getGovActionRatifier();

      await test.step("THEN:gov action ratifier should not be null", () => {
        Assertions.assertNotNull(
          govActionRatifier,
          "gov action ratifier should not be null."
        );
      });
    });
  });
});
