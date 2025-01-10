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

  test("Check get gov ratification result for hard fork", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for hard fork", async () => {
      let getRatificationResult = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForHardForkInitiationAction();

      await test.step("WHEN: Retrieve field result", async () => {
        let hard_fork_intiation_action = getRatificationResult.map(
          (getRatificationResultDto) =>
            getRatificationResultDto.hard_fork_intiation_action
        );
        let expired_epoch = getRatificationResult.map(
          (getRatificationResultDto) => getRatificationResultDto.expired_epoch
        );
        let cc_yes_vote = getRatificationResult.map(
          (getRatificationResultDto) => getRatificationResultDto.cc_yes_vote
        );
        let cc_no_vote = getRatificationResult.map(
          (getRatificationResultDto) => getRatificationResultDto.cc_no_vote
        );
        let cc_threshold = getRatificationResult.map(
          (getRatificationResultDto) => getRatificationResultDto.cc_threshold
        );
        let spo_yes_vote_taken = getRatificationResult.map(
          (getRatificationResultDto) =>
            getRatificationResultDto.spo_yes_vote_taken
        );
        let spo_abstain_vote_taken = getRatificationResult.map(
          (getRatificationResultDto) =>
            getRatificationResultDto.spo_abstain_vote_taken
        );
        let spo_total_stake = getRatificationResult.map(
          (getRatificationResultDto) => getRatificationResultDto.spo_total_stake
        );
        let drep_yes_vote_stake = getRatificationResult.map(
          (getRatificationResultDto) =>
            getRatificationResultDto.drep_yes_vote_stake
        );
        let drep_no_vote_stake = getRatificationResult.map(
          (getRatificationResultDto) =>
            getRatificationResultDto.drep_no_vote_stake
        );
        let cc_state = getRatificationResult.map(
          (getRatificationResultDto) => getRatificationResultDto.cc_state
        );
        let last_enacted_gov_action_id = getRatificationResult.map(
          (getRatificationResultDto) =>
            getRatificationResultDto.last_enacted_gov_action_id
        );
        let is_action_ratification_delayed = getRatificationResult.map(
          (getRatificationResultDto) =>
            getRatificationResultDto.is_action_ratification_delayed
        );
        let current_epoch_param = getRatificationResult.map(
          (getRatificationResultDto) =>
            getRatificationResultDto.current_epoch_param
        );

        await test.step("THEN: Field should not be null", async () => {
          Assertions.assertNotNull(
            hard_fork_intiation_action,
            "field should not be null"
          );
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
