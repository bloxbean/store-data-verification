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

  test("Check get gov ratification result for hard fork", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for hard fork", async () => {
      let hardForkRatification = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForHardForkInitiationAction();

      await test.step("THEN:gov ratification result for hard fork should not be null", () => {
        Assertions.assertNotNull(
          hardForkRatification,
          "gov ratification result for hard fork should not be null."
        );
      });
    });
  });
});
