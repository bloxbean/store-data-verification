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

  test("Check get gov action ratifier", async ({}) => {
    test.step("GIVEN: Retrieve gov action ratifier", async () => {
      let govActionRatifier = await (
        await yaciGovernanceRuleService()
      ).getGovActionRatifier();

      await test.step("WHEN: Retrieve  gov action ratifier field", async () => {
        let gov_action = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.gov_action
        );
        let expired_epoch = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.expired_epoch
        );
        let cc_yes_vote = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.cc_yes_vote
        );
        let cc_no_vote = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.cc_no_vote
        );
        let cc_threshold = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.cc_threshold
        );
        let spo_yes_vote_taken = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.spo_yes_vote_taken
        );
        let spo_abstain_vote_taken = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.spo_abstain_vote_taken
        );
        let spo_total_stake = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.spo_total_stake
        );
        let drep_yes_vote_stake = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.drep_yes_vote_stake
        );
        let drep_no_vote_stake = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.drep_no_vote_stake
        );
        let cc_state = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.cc_state
        );
        let last_enacted_gov_action_id = govActionRatifier.map(
          (govActionRatifierDto) =>
            govActionRatifierDto.last_enacted_gov_action_id
        );
        let is_action_ratification_delayed = govActionRatifier.map(
          (govActionRatifierDto) =>
            govActionRatifierDto.is_action_ratification_delayed
        );
        let current_epoch_param = govActionRatifier.map(
          (govActionRatifierDto) => govActionRatifierDto.current_epoch_param
        );

        await test.step("THEN: Field should not be null", async () => {
          Assertions.assertNotNull(gov_action, "field should not be null");
          Assertions.assertNotNull(expired_epoch, "field should not be null");
          Assertions.assertNotNull(cc_yes_vote, "field should not be null");
          Assertions.assertNotNull(cc_no_vote, "field should not be null");

          Assertions.assertNotNull(cc_threshold, "field should not be null");
          Assertions.assertNotNull(
            spo_yes_vote_taken,
            "field should not be null"
          );
          Assertions.assertNotNull(
            spo_abstain_vote_taken,
            "field should not be null"
          );
          Assertions.assertNotNull(spo_total_stake, "field should not be null");
          Assertions.assertNotNull(
            drep_yes_vote_stake,
            "field should not be null"
          );
          Assertions.assertNotNull(
            drep_no_vote_stake,
            "field should not be null"
          );
          Assertions.assertNotNull(cc_state, "field should not be null");
          Assertions.assertNotNull(
            last_enacted_gov_action_id,
            "field should not be null"
          );
          Assertions.assertNotNull(
            is_action_ratification_delayed,
            "field should not be null"
          );
          Assertions.assertNotNull(
            current_epoch_param,
            "field should not be null"
          );
        });
      });
    });
  });
});
