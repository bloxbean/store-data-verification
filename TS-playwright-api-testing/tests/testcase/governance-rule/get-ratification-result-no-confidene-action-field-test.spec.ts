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

  test("Check get gov ratification result for no confidence action", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for no confidence action", async () => {
      let noConfidenceAction = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForNoConfidenceAction();

      await test.step("WHEN: Retrieve field", async () => {
        let no_confidence = noConfidenceAction.map(
          (noConfidenceActionDto) => noConfidenceActionDto.no_confidence
        );
        let expired_epoch = noConfidenceAction.map(
          (noConfidenceActionDto) => noConfidenceActionDto.expired_epoch
        );
        let spo_yes_vote_taken = noConfidenceAction.map(
          (noConfidenceActionDto) => noConfidenceActionDto.spo_yes_vote_taken
        );
        let spo_abstain_vote_taken = noConfidenceAction.map(
          (noConfidenceActionDto) =>
            noConfidenceActionDto.spo_abstain_vote_taken
        );
        let spo_total_stake = noConfidenceAction.map(
          (noConfidenceActionDto) => noConfidenceActionDto.spo_total_stake
        );
        let drep_yes_vote_stake = noConfidenceAction.map(
          (noConfidenceActionDto) => noConfidenceActionDto.drep_yes_vote_stake
        );
        let drep_no_vote_stake = noConfidenceAction.map(
          (noConfidenceActionDto) => noConfidenceActionDto.drep_no_vote_stake
        );
        let last_enacted_gov_action_id = noConfidenceAction.map(
          (noConfidenceActionDto) =>
            noConfidenceActionDto.last_enacted_gov_action_id
        );
        let is_action_ratification_delayed = noConfidenceAction.map(
          (noConfidenceActionDto) =>
            noConfidenceActionDto.is_action_ratification_delayed
        );
        let current_epoch_param = noConfidenceAction.map(
          (noConfidenceActionDto) => noConfidenceActionDto.current_epoch_param
        );

        await test.step("THEN: Field should not be null", async () => {
          Assertions.assertNotNull(no_confidence, "field should not be null");
          Assertions.assertNotNull(expired_epoch, "field should not be null");
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
