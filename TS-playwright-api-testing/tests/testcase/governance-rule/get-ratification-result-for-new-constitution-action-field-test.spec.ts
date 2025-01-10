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
      let getNewConsitution = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForNewConstitutionAction();

      await test.step("WHEN: Retrieve field result", async () => {
        let new_consitution = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.new_consitution
        );
        let expired_epoch = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.expired_epoch
        );
        let cc_yes_vote = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.cc_yes_vote
        );
        let cc_no_vote = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.cc_no_vote
        );
        let cc_threshold = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.cc_threshold
        );
        let spo_yes_vote_taken = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.spo_yes_vote_taken
        );
        let spo_abstain_vote_taken = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.spo_abstain_vote_taken
        );
        let spo_total_stake = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.spo_total_stake
        );
        let drep_yes_vote_stake = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.drep_yes_vote_stake
        );
        let drep_no_vote_stake = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.drep_no_vote_stake
        );
        let cc_state = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.cc_state
        );
        let last_enacted_gov_action_id = getNewConsitution.map(
          (getNewConsitutionDto) =>
            getNewConsitutionDto.last_enacted_gov_action_id
        );
        let is_action_ratification_delayed = getNewConsitution.map(
          (getNewConsitutionDto) =>
            getNewConsitutionDto.is_action_ratification_delayed
        );
        let current_epoch_param = getNewConsitution.map(
          (getNewConsitutionDto) => getNewConsitutionDto.current_epoch_param
        );

        await test.step("THEN: Field should not be null", async () => {
          Assertions.assertNotNull(new_consitution, "field should not be null");
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
